import { QuestionCircleOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import './index.css'

const 使用须知 = () => {
  return (
    <h1 className={'tools-jcl-info-modal-title'}>
      <Popover
        title='使用说明'
        content={
          <div>
            <p>1、录制你的JCL战斗文件{`(格式后缀为.jcl)`}</p>
            <p>
              2、打开魔盒下载
              <a href='https://www.jx3box.com/bps/83133' target='_blank' rel='noreferrer'>
                考拉大佬的Formulator
              </a>
            </p>
            <p>
              3、打开Formulator，点击<span className='tools-jcl-info-modal-tip-btn'>请上传JCL</span>
              <p>
                若上传后无反应，说明Formulator未对该JCL对应的职业/奇穴等进行兼容，请移步魔盒联系考拉大佬
              </p>
            </p>
            <p>
              4、选择<span className='tools-jcl-info-modal-tip-btn'>一键大附魔</span>
              ，点击<span className='tools-jcl-info-modal-tip-btn'>开始模拟</span>
            </p>
            <p>
              5、点击<span className='tools-jcl-info-modal-tip-btn'>导出上一次模拟结果！</span>
              ，并在你放置.jcl文件的文件夹下找到相同名字的.json文件
            </p>
            <p>
              6、打开网页计算器JCL战斗解析，复制JSON文件内容至
              <span className='tools-jcl-info-modal-tip-btn'>数据</span>输入框。
              选择对应的心法、战斗时间
            </p>
            <p>
              7、点击
              <span className='tools-jcl-info-modal-tip-btn'>获取数据</span>
            </p>
            <p style={{ marginBottom: 8 }}>
              8、如果该职业支持直接将解析数据保存为计算循环，可点击
              <span className='tools-jcl-info-modal-tip-btn'>保存循环</span>
              按钮。直接生成外部可计算循环。
            </p>
          </div>
        }
      >
        <span className={'tools-jcl-info-modal-tip-text'}>
          使用说明
          <QuestionCircleOutlined className={'tools-jcl-info-modal-tip-icon'} />
        </span>
      </Popover>
    </h1>
  )
}

export default 使用须知
