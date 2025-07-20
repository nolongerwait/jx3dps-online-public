// 根据账号角色导入
import { Alert, Button, Image, Input, message, Modal, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import ServerCascader from '@/组件/ServerCascader'
import { GLOBAL_CDN_PREFIX } from '@/工具函数/const'
import { 获取页面参数 } from '@/工具函数/help'
import 心法枚举 from '@/数据/静态数据/心法枚举.json'
import { 数据埋点 } from '@/工具函数/tools/log'
import styles from './index.module.less'
import HistoryItem from './historyItem'
import './index.css'

const 教程_1 = `${GLOBAL_CDN_PREFIX}/account_tip_1.png`
const 教程_2 = `${GLOBAL_CDN_PREFIX}/account_tip_2.png`

const 隐藏标识 = true

function AccountImport({ onOk }) {
  const [loading, setLoading] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [name, changeName] = useState<string>()
  const [server, changeServer] = useState<string>()
  const [data, setData] = useState<any>(undefined)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [历史导入记录, 更新历史导入记录] = useState<
    { name: string; server: string; xinfaId: string }[]
  >([])

  const urlName = 获取页面参数('name')

  useEffect(() => {
    if (urlName) {
      changeName(urlName)
    }
  }, [urlName])

  useEffect(() => {
    const 历史导入记录 = localStorage.getItem('历史导入记录')
    if (历史导入记录) {
      更新历史导入记录(JSON.parse(历史导入记录))
    }
  }, [])

  const beforeGetPzData = () => {
    handleGetPzData()
  }

  const handleGetPzData = async (propsName?, propsServer?) => {
    const apiName = propsName || name
    const apiServer = propsServer || server
    if (!apiName || !apiServer?.length) {
      return
    }
    setLoading(true)
    setData(undefined)
    setErrorMsg('')
    message.warning('开源仓库不包含接口实现，请自行实现')
    return
  }

  const handleClickImport = () => {
    if (data?.equipData?.equip) {
      更新历史记录()
      数据埋点('角色配装导入')
      onOk(data?.equipData?.equip)
    }
  }

  const 导入历史数据 = (data) => {
    changeName(data?.name)
    changeServer(data?.server)
    handleGetPzData(data?.name, data?.server)
  }

  const 更新历史记录 = () => {
    // 最多五条记录
    if (name && server) {
      const 新历史导入记录 = [...历史导入记录]
      if (历史导入记录?.some((a) => a?.name === name && a?.server === server)) {
        return
      }
      新历史导入记录.unshift({
        name,
        server,
        xinfaId: data?.userInfo?.Kungfu?.KungfuID,
      })
      if (新历史导入记录.length > 6) {
        新历史导入记录.pop()
      }
      更新历史导入记录(新历史导入记录)
      localStorage.setItem('历史导入记录', JSON.stringify(新历史导入记录))
    }
  }

  return 隐藏标识 ? (
    <div>
      <Alert
        type='error'
        style={{ fontSize: 16, textAlign: 'center' }}
        message={
          <div>
            <p>非常抱歉，因不可抗力，此功能目前已无法使用。😫</p>
          </div>
        }
      />
    </div>
  ) : (
    <div className={styles.wrap}>
      <Alert
        type='warning'
        style={{ marginBottom: 16 }}
        message={
          <div>
            <p>本功能仅作为查询使用者自身账号属性，用作辅助选择配装。</p>
            <p>严禁使用本功能对他人进行出警、拉踩、诋毁等恶意行为。</p>
            <p>若使用本功能出现纠纷，本人概不负责。</p>
            <p>
              <a onClick={() => setHelpVisible(true)}>如何获取角色UID</a>
            </p>
          </div>
        }
      />
      {历史导入记录?.length ? (
        <div className={styles.history}>
          <div className={styles.historyContent}>
            <h1 className={styles.historyTitle}>导入历史</h1>
            {历史导入记录?.map((item) => {
              return (
                <HistoryItem
                  onClick={() => 导入历史数据(item)}
                  key={`history_${item?.server}${item?.name}`}
                  data={item}
                />
              )
            })}
          </div>
        </div>
      ) : null}
      <div className='account-daoru-input-wrap no-padding'>
        <ServerCascader
          className={'account-daoru-form-server'}
          value={server}
          onChange={(e) => changeServer(e)}
          callback={beforeGetPzData}
        />
        <Input.Search
          className='account-daoru-form-content'
          value={name}
          style={{ width: 200 }}
          loading={loading}
          onChange={(e) => changeName(e.target.value.trim())}
          placeholder={'请输入角色名称或UID'}
          onPressEnter={() => {
            if (server?.length) {
              beforeGetPzData()
            }
          }}
        />
        <Button
          type='primary'
          disabled={loading || !name || !server?.length}
          onClick={() => beforeGetPzData()}
        >
          查询角色
        </Button>
      </div>
      {loading ? (
        <div className='account-daoru-text-wrap'>
          正在获取配装方案
          <Spin style={{ marginLeft: 12 }} spinning={true} />
        </div>
      ) : (
        <>
          {data ? (
            <div className={'account-daoru-success'}>
              <p className='account-daoru-success-tip'>成功获取配装方案</p>
              <div className='account-daoru-success-content'>
                <div className='account-daoru-success-info'>
                  {data?.userInfo?.personAvatar ? (
                    <img
                      className='account-daoru-success-avatar'
                      src={data?.userInfo?.personAvatar}
                      alt=''
                    />
                  ) : 心法枚举?.[data?.userInfo?.Kungfu?.KungfuID]?.icon ? (
                    <img
                      className='account-daoru-success-avatar'
                      src={心法枚举?.[data?.userInfo?.Kungfu?.KungfuID]?.icon}
                      alt=''
                    />
                  ) : null}
                  <div className='account-daoru-text-content'>
                    <div className='account-daoru-success-title' title={data?.showData?.title}>
                      {data?.userInfo?.isUidSearch
                        ? data?.userInfo?.roleName
                        : data?.userInfo?.name}
                    </div>
                    <span
                      className={
                        !心法枚举?.[data?.userInfo?.Kungfu?.KungfuID]?.name
                          ? 'account-daoru-success-name-error'
                          : ''
                      }
                    >
                      {心法枚举?.[data?.userInfo?.Kungfu?.KungfuID]?.name || '门派未识别'}
                    </span>
                    {` | `}
                    <span
                      className={
                        !data?.userInfo?.TotalEquipsScore ? 'account-daoru-success-name-error' : ''
                      }
                    >
                      {data?.userInfo?.TotalEquipsScore
                        ? `${data?.userInfo?.TotalEquipsScore}`
                        : '装分未识别'}
                    </span>
                  </div>
                  <Button type='primary' onClick={handleClickImport}>
                    导入
                  </Button>
                </div>
              </div>
              {data?.equipData?.未识别装备列表?.length ||
              data?.equipData?.未内置附魔列表?.length ? (
                <div className={'account-daoru-res-tips'}>
                  <h1 className={'account-daoru-res-tips-title'}>
                    存在以下信息未识别，会跳过导入，导入后请手动修改
                  </h1>
                  {data?.equipData?.未识别装备列表?.length ? (
                    <div className={'account-daoru-res-tips-text'}>
                      <p className={'account-daoru-res-tips-name'}>未识别装备：</p>
                      {data?.equipData?.未识别装备列表?.join('、')}
                    </div>
                  ) : null}
                  {data?.equipData?.未内置附魔列表?.length ? (
                    <div className={'account-daoru-res-tips-text'}>
                      <p className={'account-daoru-res-tips-name'}>未支持附魔：</p>
                      {data?.equipData?.未内置附魔列表?.join('、')}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
          {errorMsg ? (
            <div className='account-daoru-text-wrap account-daoru-text-error'>{errorMsg}</div>
          ) : null}
        </>
      )}
      <Modal
        footer={null}
        title='如何获取角色UID'
        open={helpVisible}
        onCancel={() => setHelpVisible(false)}
      >
        <div>
          1、发送你的角色至任意聊天频道。
          <Image className='account-daoru-help-img' src={教程_1} />
        </div>
        <div>
          2、按住「Ctrl」鼠标移动到名称上，复制玩家ID。
          <Image className='account-daoru-help-img' src={教程_2} />
        </div>
      </Modal>
    </div>
  )
}

export default AccountImport
