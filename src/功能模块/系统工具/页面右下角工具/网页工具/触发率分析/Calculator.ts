import kungfu2mask from './kungfu2mask.json'
import skill2mask from './skill2mask.json'
import kungfu2prob from './kungfu2prob.json'

type KungfuMask = [number, number]
type Probabilities = { [key: string]: { [key: number]: number } }
type Counts = { [key: string]: { [key: number]: number } }
type Records = Array<[number, string[]]>

class Calculator {
  private kungfu2mask: { [key: string]: { [key: string]: KungfuMask } }
  private skill2mask: { [key: string]: KungfuMask }
  private kungfu2prob: { [key: string]: { [key: string]: number } }

  private id2kungfu: { [key: string]: string } = {}
  private id2name: { [key: string]: string } = {}
  private rows: string[] = []
  private records: Records = []
  private counts: Counts = {}
  private probs: Probabilities = {}
  private players: any = {}
  private duration = 96
  private interval = 0

  constructor() {
    this.kungfu2mask = JSON.parse(JSON.stringify(kungfu2mask))
    this.skill2mask = JSON.parse(JSON.stringify(skill2mask))
    this.kungfu2prob = JSON.parse(JSON.stringify(kungfu2prob))

    this.reset([])
  }

  private reset(rows: string[]): void {
    this.rows = rows
    this.id2kungfu = {}
    this.id2name = {}
    this.records = []
    this.counts = {}
    this.probs = {}
    this.players = {}
  }

  private prepare(): void {
    for (const row of this.rows) {
      const columns = row.split('\t')
      if (columns[4] === '4') {
        const details = columns[columns.length - 1].trim().slice(1, -1).split(',')
        const player_id = details[0]
        const player_name = details[1]
        const kungfu_id = details[3]
        this.players[player_name] = {
          player_id,
          player_name,
          kungfu_id,
        }
        this.id2kungfu[player_id] = kungfu_id
        this.id2name[player_id] = player_name
        this.counts[player_id] = {}
      } else if (columns[4] === '21') {
        const details = columns[columns.length - 1].trim().slice(1, -1).split(',')
        // 天网特殊处理做三次判断，极其特殊，没有相同例子。实际测试3灯概率明显高于1灯，猜测天网每个灯都有独立的触发概率。但是由于有保护buff，jcl只有一个事件
        // 现猜测为写在上面的CAST_SKILL和写在下面的CastSkill不一样，上面的CAST_SKILL无法触发
        // 否则凌雪的链子、天策的灭都是上面写了好几个CAST_SKILL的
        if (details?.[4] === '30847') {
          this.records.push([parseInt(columns[1]), details])
          this.records.push([parseInt(columns[1]), details])
          this.records.push([parseInt(columns[1]), details])
        } else {
          this.records.push([parseInt(columns[1]), details])
        }
      }
    }
  }

  private parse(tag: number): void {
    for (const [frame, details] of this.records) {
      const player_id = details[0]
      if (!(player_id in this.id2kungfu)) {
        continue
      }
      const react = details[2]
      const damage_type = details[3]
      if (react === '1' || damage_type === '2') {
        continue
      }

      const skill_id = details[4]
      const [skill_mask_1, skill_mask_2] = this.skill2mask[skill_id] || [0, 0]
      const [event_mask_1, event_mask_2] = this.kungfu2mask[this.id2kungfu[player_id]][tag]

      if (skill_mask_1 & event_mask_1 || skill_mask_2 & event_mask_2) {
        if (!(frame in this.counts[player_id])) {
          this.counts[player_id][frame] = 0
        }
        this.counts[player_id][frame] += 1
      }
    }
  }

  private calculate(tag: number): void {
    for (const player_id in this.counts) {
      const player_name = this.id2name[player_id]
      const counts = this.counts[player_id]
      const probs = (this.probs[player_name] = {})
      for (const frame in counts) {
        probs[frame] = 0
      }
      const event_prob = this.kungfu2prob[this.id2kungfu[player_id]][tag] / 1024
      for (const frame in counts) {
        const count = counts[frame]
        if (count === 0) {
          continue
        }
        probs[frame] += event_prob * count
      }
    }
  }

  private calculateOverlap(tag: number): void {
    for (const player_id in this.counts) {
      const player_name = this.id2name[player_id]
      const counts = this.counts[player_id]
      const probs = (this.probs[player_name] = {})
      for (const frame in counts) {
        probs[frame] = 0
      }
      const event_prob = this.kungfu2prob[this.id2kungfu[player_id]][tag] / 1024
      for (const frame in counts) {
        const count = counts[frame]
        if (count === 0) {
          continue
        }
        const prob = 1 - Math.pow(1 - event_prob, count)
        for (let i = +frame; i < +frame + this.duration; i++) {
          if (!(i in probs)) {
            continue
          }
          probs[i] += (1 - probs[i]) * prob
        }
      }
    }
  }

  private calculateInterval(tag: number): void {
    for (const [player_id, counts] of Object.entries(this.counts)) {
      const playerName = this.id2name[player_id]
      const probs = (this.probs[playerName] = {})
      const eventProb = this.kungfu2prob[this.id2kungfu[player_id]][tag] / 1024

      for (const [frameStr, count] of Object.entries(counts)) {
        const frame = parseInt(frameStr)
        if (!count) continue

        const suppressProb =
          1 -
          Object.entries(probs)
            .filter(([f]) => parseInt(f) > frame - this.interval)
            .reduce((sum, [_, p]: any) => sum + p, 0)

        probs[frame] = (1 - Math.pow(1 - eventProb, count)) * suppressProb
      }
    }
  }

  private calculateHybrid(tag: number): void {
    this.calculateInterval(tag)
    for (const player_name in this.probs) {
      const probs = this.probs[player_name]
      const final_probs: { [key: number]: number } = {}
      for (const frame in probs) {
        final_probs[frame] = 0
      }
      for (const frame in probs) {
        const prob = probs[frame]
        if (prob === 0) {
          continue
        }
        for (let i = +frame; i < +frame + this.duration; i++) {
          if (!(i in final_probs)) {
            continue
          }
          final_probs[i] += (1 - final_probs[i]) * prob
        }
      }
      this.probs[player_name] = final_probs
    }
  }

  public call(fileData: string[], tag: number, interval): { probs: Probabilities; players: any } {
    this.reset(fileData)
    this.prepare()
    this.parse(tag)
    if (tag === 0) {
      this.duration = 6 * 16
      this.calculateOverlap(tag)
    } else if (tag === 1) {
      this.interval = (interval || 40) * 16
      this.calculateInterval(tag)
    } else if (tag === 2) {
      this.calculate(tag)
    } else if (tag === 3) {
      this.duration = 8 * 16
      this.interval = (interval || 30) * 16
      this.calculateHybrid(tag)
    } else if (tag === 4) {
      this.interval = (interval || 10) * 16
      this.calculateInterval(tag)
    }

    return {
      probs: this.probs,
      players: this.players,
    }
  }
}

export default Calculator
