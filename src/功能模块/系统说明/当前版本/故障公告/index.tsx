import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import styles from './index.module.less'

const PublicModal = () => {
  // 公告
  const [publicVisible, setPublicVisible] = useState(false)

  const handleClosePublic = () => {
    localStorage?.setItem('故障公告', '1')
    setPublicVisible(false)
  }

  useEffect(() => {
    checkPublic()
  }, [])

  const checkPublic = () => {
    const storageNotice = localStorage.getItem('故障公告')
    if (!storageNotice) {
      setPublicVisible(true)
    }
  }

  return (
    <Modal
      width={1000}
      open={publicVisible}
      centered
      onCancel={() => handleClosePublic()}
      footer={false}
      maskClosable={false}
    >
      <h1 className={styles.title}>关于计算器服务4月21日无法使用情况的说明</h1>
      <p className={styles.subTitle}>亲爱的在线配装计算器用户：</p>
      <p className={styles.text}>
        我们的服务在本周一（2025年4月21日）14:00左右遭受DDoS攻击，导致服务暂时不可用，目前已完成修复并恢复访问。
      </p>
      <p className={styles.text}>
        {
          '在线配装计算器上线一年多以来，始终由"可乐"和"蓝团"两位技术负责人无偿提供服务器支持。作为完全免费的非盈利项目，所有运营成本均由团队自行承担。可以说这个由玩家共同搭建的工具站，承载着社区的热爱。'
        }
      </p>
      <p className={styles.text}>
        我想了很久，没有想清楚此次事件中谁是获利者。最终我只能认为，这次攻击是一次单纯的恶意破坏，超出了正常竞争范畴。
      </p>
      <p className={styles.text}>
        此次事件让我非常意外——作为一个不涉及交易、没有广告的静态资源网站，我们从未想过会遭遇有组织的流量攻击。随着计算器功能扩展，我们意识到可能触及某些利益群体，但未曾预料攻击会如此迅速到来。在这之前我并没有对网站做相关的防护措施。
      </p>
      <p className={styles.text}>
        在此向所有用户郑重致歉：由于我的防御预案不足，导致大家无法正常使用工具，在这里对无法使用带来的不便表示抱歉。相关防护措施已紧急部署完成，
      </p>
      <p className={`${styles.text} ${styles.bold}`}>这里提醒各位用户在日后的使用中注意：</p>
      <p className={styles.textLine}>
        1、避免频发刷新网页，触发流量防御导致访问受限。如若遇到限制，请稍后再进行使用。我们也会逐步完善限制规则，合理区分正常用户和攻击者。
      </p>
      <p className={styles.textLine}>
        2、定期使用网页右下角的数据迁移工具下载数据备份，避免数据丢失。
      </p>
      <p className={`${styles.text} ${styles.bold}`}>需要特别说明的是：</p>
      <p className={styles.textLine}>1. 本计算器所有算法和数据代码开源，透明可追溯</p>
      <p className={styles.textLine}>2. 从未也永远不会进行数据美化或定向优化</p>
      <p className={styles.textLine}>3. 从未也永远不会进行使用收费</p>
      <p className={styles.text}>
        对于此次攻击的人，如果这些触犯了你的利益，或者你只是单纯的看我不顺眼。大可以只针对我个人，没必要伤害无辜的服务器提供者和计算器用户。
        <br />
        若对本工具有技术性质疑，我接受各种方式的数据、计算论证。
      </p>
      <p className={styles.text}>
        这个由玩家托起的工具站，承载的不仅是代码和数据，更是万千玩家的信任。攻击或许能暂时动摇枝叶，但深植土壤的根系终将让恶意无所遁形。
      </p>
      <p className={styles.text}>黑暗滋养的只是霉菌，而我们在培育森林。</p>
      <p className={styles.tip}>在线配装计算器团队</p>
      <p className={styles.tip}>2025年4月22日</p>
    </Modal>
  )
}

export default PublicModal
