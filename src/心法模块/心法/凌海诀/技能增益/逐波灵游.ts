import { 技能增益列表类型 } from '@/@types/技能'
import 通用增益 from './通用增益/通用'
import 碧海飘渺掌增益 from './通用增益/碧海飘渺掌增益'

const 逐波灵游增益: 技能增益列表类型[] = [...通用增益, ...碧海飘渺掌增益]

export default 逐波灵游增益
