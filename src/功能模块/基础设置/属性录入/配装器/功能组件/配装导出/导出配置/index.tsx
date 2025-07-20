import React, { useContext, useState } from 'react'
import { Button, Checkbox, Input, message } from 'antd'
import { 数据埋点 } from '@/工具函数/tools/log'
import html2canvas from 'html2canvas'
import ExportContext from '../context'
import 生成二维码弹窗 from './生成二维码弹窗'
import styles from './index.module.less'

const 导出配置 = () => {
  const {
    方案名称,
    设置方案名称,
    方案创建人,
    设置方案创建人,
    方案备注,
    设置方案备注,
    是否展示伤害,
    设置是否展示伤害,
    设置自定义二维码链接,
    设置自定义二维码标题,
    获取表单信息,
  } = useContext(ExportContext)

  const [二维码弹窗, 设置二维码弹窗] = useState<boolean>(false)

  const 点击截图 = (type = 'copy') => {
    数据埋点('保存配装方案')
    const element: any = document.getElementById('export_pz_content') // 获取要截图的元素
    html2canvas(element, { useCORS: true }).then((canvas) => {
      // 创建一个新的Canvas，并设置宽高
      const borderWidth = 20 // 设置白边的宽度
      const newCanvas = document.createElement('canvas')
      newCanvas.width = canvas.width + borderWidth * 2 // 加上左右的边框
      newCanvas.height = canvas.height + borderWidth * 2 // 加上上下的边框

      const ctx: any = newCanvas.getContext('2d')

      // 绘制白色背景
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, newCanvas.width, newCanvas.height)

      ctx.drawImage(canvas, borderWidth, borderWidth) // 在新的canvas中绘制原始canvas

      if (type === 'copy') {
        newCanvas.toBlob((blob) => {
          if (blob) {
            const item = new ClipboardItem({ 'image/png': blob })
            navigator.clipboard
              .write([item])
              .then(() => {
                message.success('截图已复制到剪贴板！')
              })
              .catch((err) => {
                console.error('复制到剪贴板失败:', err)
              })
          }
        })
      } else {
        const dataURL = newCanvas.toDataURL('image/png')
        // 创建一个链接元素
        const link = document.createElement('a')
        link.href = dataURL
        link.download = `${方案名称 || '配装方案'}_${方案创建人 || ''}.png` // 设置下载的文件名

        // 触发点击事件以下载文件
        document.body.appendChild(link)
        link.click()
        message.success('已保存')
      }
    })
  }

  const 删除二维码 = () => {
    设置自定义二维码链接(undefined)
    设置自定义二维码标题(undefined)
  }

  const 复制导出表单信息 = async () => {
    const 表单信息 = await 获取表单信息()
    复制(JSON.stringify(表单信息))
  }

  const 复制 = (text) => {
    if (text) {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', text)
      input.select()
      document.execCommand('copy') // 执行浏览器复制命令
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        message.success(`复制成功`)
      }
      // if (text?.includes('未匹配')) {
      //   message.warning('存在未匹配装备')
      // }
      document.body.removeChild(input)
    }
  }

  return (
    <div className={styles.setting}>
      <div className={styles.item}>
        <h1 className={styles.title}>配装名称</h1>
        <Input
          value={方案名称}
          onChange={(e) => 设置方案名称(e?.target?.value)}
          placeholder={'请输入配装名称'}
          maxLength={12}
        />
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>创建人</h1>
        <Input
          value={方案创建人}
          onChange={(e) => 设置方案创建人(e?.target?.value)}
          placeholder={'请输入配装创建人'}
          maxLength={15}
        />
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>备注</h1>
        <Input.TextArea
          value={方案备注}
          onChange={(e) => 设置方案备注(e?.target?.value)}
          placeholder={'请输入配装备注'}
          maxLength={24}
          showCount
          style={{ resize: 'none' }}
        />
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>配置项</h1>
        <Checkbox checked={是否展示伤害} onChange={(e) => 设置是否展示伤害(e?.target?.checked)}>
          显示伤害
        </Checkbox>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>自定义二维码</h1>
        <div className={styles.codeWrap}>
          <Button onClick={() => 设置二维码弹窗(true)} size='small'>
            生成二维码
          </Button>
          <Button danger onClick={删除二维码} size='small'>
            删除二维码
          </Button>
        </div>
      </div>
      <div className={styles.footer}>
        <Button className={styles.btn} block onClick={() => 复制导出表单信息()}>
          导出代码
        </Button>
        <Button className={styles.btn} block danger onClick={() => 点击截图('copy')}>
          截图
        </Button>
        <Button className={styles.btn} block type='primary' onClick={() => 点击截图('download')}>
          保存
        </Button>
      </div>
      <生成二维码弹窗 open={二维码弹窗} onCancel={() => 设置二维码弹窗(false)} />
    </div>
  )
}

export default 导出配置
