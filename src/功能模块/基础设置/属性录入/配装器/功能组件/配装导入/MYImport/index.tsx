// 根据账号角色导入
import { Button, Image, Input, Modal, Tag } from 'antd'
import React, { useState } from 'react'
import { 数据埋点 } from '@/工具函数/tools/log'
import styles from './index.module.less'
import { getEquipData } from './import'
import { 教程_1, 教程_2, 教程_3, 教程_4, 教程_5 } from './assets'

function MYImport({ onOk }) {
  const [val, setVal] = useState<string>() // 待解析字符串
  const [importData, setImportData] = useState<any>(undefined) // 用做导到表单的数据
  const [showData, setShowData] = useState<any>(undefined) // 显示用解析成功信息
  const [errorMsg, setErrorMsg] = useState<string>('') // 报错信息提示
  const [helpVisible, setHelpVisible] = useState(false)

  const handleGetPzData = async () => {
    setImportData(undefined)
    setShowData(undefined)
    try {
      const res = getEquipData(val)
      setShowData(res)
      if (res?.识别装备列表?.length) {
        setImportData(res?.equip)
      } else {
        setErrorMsg('未识别支持任何装备')
      }
    } catch (e) {
      setErrorMsg('解析失败，请检查输入数据格式')
    }
  }

  const handleClickImport = () => {
    if (importData) {
      数据埋点('茗伊配装导入')
      onOk(importData)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <a onClick={() => setHelpVisible(true)}>如何使用</a>
        </div>
        <div className={styles.search}>
          <Button onClick={handleGetPzData} disabled={!val} type='primary'>
            解析数据
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={handleClickImport}
            disabled={!importData || !showData?.识别装备列表?.length}
            danger
            type='primary'
          >
            导入
          </Button>
        </div>
      </div>

      <Input.TextArea
        value={val}
        className={styles.input}
        onChange={(e) => setVal(e?.target?.value)}
        placeholder='请输入导入代码'
      />

      {showData ? (
        <div className={styles.showData}>
          {showData?.识别装备列表?.length ? (
            <div className={styles.item}>
              <h1 className={`${styles.itemLabel} ${styles.successLabel}`}>成功识别装备：</h1>
              <div className={styles.tagWrap}>
                {showData?.识别装备列表?.map((item, index) => (
                  <Tag
                    className={styles.itemTag}
                    title={item?.装备名称}
                    key={`MY识别_${item?.装备ID}_${index}`}
                  >
                    {item?.装备名称}
                  </Tag>
                ))}
              </div>
            </div>
          ) : null}
          {showData?.识别大附魔列表?.length ? (
            <div className={styles.item}>
              <h1 className={`${styles.itemLabel} ${styles.successLabel}`}>成功识别大附魔：</h1>
              <div className={styles.itemValue}>{showData?.识别大附魔列表?.join('、')}</div>
            </div>
          ) : null}
          {showData?.未识别装备列表?.length ? (
            <div className={styles.item}>
              <h1 className={`${styles.itemLabel} ${styles.errorLabel}`}>未识别装备：</h1>
              <div className={styles.itemValue}>{showData?.未识别装备列表?.join('、')}</div>
            </div>
          ) : null}
          {showData?.未内置附魔列表?.length ? (
            <div className={styles.item}>
              <h1 className={`${styles.itemLabel} ${styles.errorLabel}`}>未识别附魔：</h1>
              <div className={styles.itemValue}>{showData?.未内置附魔列表?.join('、')}</div>
            </div>
          ) : null}
          {showData?.未识别五彩石 ? (
            <div className={styles.item}>
              <h1 className={`${styles.itemLabel} ${styles.errorLabel}`}>未识别五彩石：</h1>
              <div className={styles.itemValue}>{showData?.未识别五彩石}</div>
            </div>
          ) : null}
        </div>
      ) : null}
      {errorMsg ? <div className={styles.errorMessage}>{errorMsg}</div> : null}
      <Modal
        footer={null}
        title='如何使用插件导入'
        open={helpVisible}
        onCancel={() => setHelpVisible(false)}
      >
        <p className={styles.tip}>部分信息无法识别，导入后请手动调整</p>
        <Image className={styles.img} src={教程_1} />
        <Image className={styles.img} src={教程_2} />
        <Image className={styles.img} src={教程_3} />
        <Image className={styles.img} src={教程_4} />
        <Image className={styles.img} src={教程_5} />
      </Modal>
    </div>
  )
}

export default MYImport
