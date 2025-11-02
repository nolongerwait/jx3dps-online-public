import { 技能增益列表类型 } from '@/@types/技能'
import 通用增益 from './通用增益/通用增益'
import 普渡易伤 from './通用增益/普渡易伤'

const 降魔增益: 技能增益列表类型[] = [...通用增益, ...普渡易伤]

export default 降魔增益
