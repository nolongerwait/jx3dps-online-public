import { 每秒郭氏帧 } from "@/数据/常量";

interface State {
  // 记录的是落子的时间帧数
  black: number[];
  white: number[];
  prob: number;
}

class 定式黑白 {
  states: State[] = [];
  DURATION = 8 * 每秒郭氏帧; // 棋子持续时长
  constructor() {
    this.states = [{ black: [], white: [], prob: 1 }]; // [{ time, states, expireTime }]
  }
  
  /**
   * 施放技能，生成count个棋子
   * @param {number} count - 棋子数量
   * @param {number} time - 当前时间（秒）
   * @returns {number} 期望爆炸伤害次数
   */
  触发定式黑白(count: number, time: number) {
    let totalDamage = 0;
    
    for (let i = 0; i < count; i++) {
      this.清理过期棋子(time + i * 每秒郭氏帧);
      this.合并同类概率();
      totalDamage += this.新增一枚棋子(time + i * 每秒郭氏帧);
    }

    return totalDamage;
  }

  清理过期棋子(当前时间: number) {
    this.states = this.states.map(i => ({
      black: i.black.filter(j => j > 当前时间),
      white: i.white.filter(j => j > 当前时间),
      prob: i.prob,
    }))
  }

  合并同类概率() {
    const statesMap = this.states.reduce((res, i) => ({
      ...res,
      [`${i.black.join(',')}|${i.white.join(',')}`]: (res[`${i.black.join(',')}|${i.white.join(',')}`] || 0) + i.prob,
    }), {})
    this.states = Object.keys(statesMap).map(i => ({
      black: i.split('|')[0].split(',').filter(j => j !== '').map(j => parseInt(j)),
      white: i.split('|')[1].split(',').filter(j => j !== '').map(j => parseInt(j)),
      prob: statesMap[i],
    }))
  }
  
  /**
   * 添加一个随机颜色的棋子，按连锁爆炸规则处理
   * 规则：如果新子与场上所有子颜色都不同（场上只有一种颜色），触发爆炸
   *      爆炸伤害 = 场上棋子数 + 1（新子）
   * @private
   */
  新增一枚棋子(time: number) {
    const newStates: State[] = [];
    let expectedDamage = 0;
    
    this.states.forEach(state => {
      const { black, white, prob } = state;
      const totalPieces = black.length + white.length;
      
      // 50%概率生成黑子
      if (white.length > 0 && black.length === 0) {
        // 场上只有白子，生成黑子 → 触发连锁爆炸！
        // 伤害 = 场上所有白子 + 新黑子 = totalPieces + 1
        expectedDamage += prob * 0.5 * (totalPieces + 1);
        // 爆炸后场上清空
        newStates.push({ black: [], white: [], prob: prob * 0.5 });
      } else {
        // 场上为空或有黑子 → 不爆炸，黑子留在场上
        newStates.push({ black: [...black, time + this.DURATION], white: [], prob: prob * 0.5 });
      }
      
      // 50%概率生成白子
      if (black.length > 0 && white.length === 0) {
        // 场上只有黑子，生成白子 → 触发连锁爆炸！
        // 伤害 = 场上所有黑子 + 新白子 = totalPieces + 1
        expectedDamage += prob * 0.5 * (totalPieces + 1);
        // 爆炸后场上清空
        newStates.push({ black: [], white: [], prob: prob * 0.5 });
      } else {
        // 场上为空或有白子 → 不爆炸，白子留在场上
        newStates.push({ black, white: [...white, time + this.DURATION], prob: prob * 0.5 });
      }
    });

    this.states = [...newStates];
    return expectedDamage;
  }
  
  /**
   * 重置计算器
   */
  reset() {
    this.states = [{ black: [], white: [], prob: 1 }]; // [{ time, states, expireTime }]
  }
}

export const 定式黑白实例 = new 定式黑白();