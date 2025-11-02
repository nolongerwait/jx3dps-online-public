export // interface.d.ts

interface Buff {
  belong: string
  buff_id: number
  buff_level: number
  buff_type: string // Snapshot快照 Current当前 Both都有
  stack: number
}

export interface Skill {
  belong: string
  skill_id: number
  skill_level: number
  count: number
}

export interface DotSource {
  belong: string
  skill_id: number
  skill_level: number
  count: number
}

export interface Dot {
  belong: string
  dot_id: number
  dot_level: number
  source: DotSource
  consume_tick: number
  current_tick: number
  count: number
}

export interface Record {
  name: string
  count: number
  duration: number
  buffs: Buff[]
  skills: Skill[]
  dots: Dot[]
}

export interface LoopItem {
  name: string
  count: number
  duration: number
  records: Record[]
}
