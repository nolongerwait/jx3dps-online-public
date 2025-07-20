import styles from './index.module.less'

const FullLoading = () => {
  return (
    <div className={styles.fullLoading}>
      <div className={styles.content}>
        <img
          src="https://img.jx3box.com/image/xf/0.png"
          className={styles.icon}
        />
        加载中...
      </div>
    </div>
  )
}

export default FullLoading
