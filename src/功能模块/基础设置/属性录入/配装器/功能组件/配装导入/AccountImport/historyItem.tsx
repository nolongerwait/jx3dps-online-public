import 心法枚举 from '@/数据/静态数据/心法枚举.json'
import styles from './index.module.less'

const HistoryItem = ({ data: propsData, onClick }: { data: any; onClick: any }) => {
  const { name, server, xinfaId } = propsData
  console.log('xinfaId', xinfaId)

  return (
    <div className={styles.historyItem} onClick={onClick}>
      {心法枚举?.[xinfaId]?.icon ? (
        <img className={styles.historyAvatar} src={心法枚举?.[xinfaId]?.icon} alt='' />
      ) : null}
      <div className={styles.info}>
        <div className={styles.infoName}>{name}</div>
        <div className={styles.infoServer}>{server}</div>
      </div>
    </div>
  )
}

export default HistoryItem
