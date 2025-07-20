import React, { useContext } from 'react'
import ExportContext from '../context'
import styles from './index.module.less'
import { QRCodeCanvas } from 'qrcode.react'

const 二维码区 = () => {
  const { 自定义二维码链接, 自定义二维码标题 } = useContext(ExportContext)

  function truncateString(str, maxLength = 30) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...'
    }
    return str
  }

  const Code = ({ title, url }) => {
    const urlText = truncateString(url?.replace('https://', ''))
    return (
      <div className={styles.codeItem}>
        <div className={styles.codeContent}>
          <QRCodeCanvas value={url} size={34} fgColor='#000000' bgColor='#ffffff' />
        </div>
        <div className={styles.codeInfo}>
          <h1 className={styles.codeTitle}>@{title}</h1>
          <div className={styles.codeUrl}>{urlText}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.codeWrap}>
      {自定义二维码链接 && 自定义二维码标题 ? (
        <Code title={自定义二维码标题} url={自定义二维码链接} />
      ) : null}
      <Code title={'在线配装计算器'} url={'https://jx3box.com/bps/79885'} />
    </div>
  )
}

export default 二维码区
