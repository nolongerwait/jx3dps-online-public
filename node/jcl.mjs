import fs from 'fs'
import path from 'path'
import XLSX from 'xlsx'

const BASE_DIR = path.join('../../../../../Downloads/刀宗延迟活动原始数据/原始未处理数据')

// 处理 .jcl 文件的函数
function processJclFile(filePath,name) {
  // 读取 .jcl 文件内容并进行处理
  const data = fs.readFileSync(filePath, 'utf-8')
  const 数组 = data.split('\n')
  let startTime = 0
  let endTime = 0
  let endTimeList = []
  for (let i = 0; i < 数组.length; i++) {
    // 根据制表符拆分
    const logList = 数组[i]?.split('\t')
    // 获取事件类型
    const type = logList[4]

    const logData = logList[5]
    const time = +logList?.[1]
    const list = logData?.split(',')

    if (type === '21') {
      // 获取具体LogData
      // 根据,拆分 获取技能id
      if (list?.[4]) {
        const id = +list?.[4]
        // 断云势ID
        if (id === 32167) {
          endTimeList.push(time)
        } else {
          if (!startTime && time) {
            startTime = time
          }
        }
      }
      // 判断获得Buff
    }
  }
  endTime = findTenthSmallest(endTimeList)
  if (endTime) {
    // console.log('startTime',startTime)
    // console.log('endTime',endTime)
    // 这里可以自定义你的处理逻辑
    return endTime - startTime // 返回处理后的数据
  } else {
		if (endTimeList?.length) {
			console.log(name,'JCL技能数不足')
		} else {
			console.log(name,'未获取到断云势数据时间')
		}
    return 0
  }
}

// 处理 .txt 文件的函数
function processTxtFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const result = {}

  lines.forEach((line) => {
    const splitItem = line?.includes('：') ? '：' : ':' || '：'
    let [key, value] = line.split(splitItem)
    if (key && value) {
      if (key === '角色名') {
        key = '角色'
      }
      if (key === '城市') {
        key = '所在城市'
      }
      if (key === '是否解锁' || key === '解锁帧') {
        key = '是否解锁帧数'
      }
      if (key === 'PS') {
        key = '备注'
      }
      result[key.trim()] = value.trim()
    }
  })

  // if (!result.角色) {
  //   console.log('lines', lines)
  // }

  return result // 返回处理后的数据
}

// 存储最终结果的数组
function main() {
  const finalResults = []

  // 读取目录并递归处理文件
  function readDirectory(dirPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(dirPath, (err, files) => {
        if (err) {
          return reject('无法读取目录: ' + err)
        }

        let totalFiles = 0 // 记录总文件数量
        let filesProcessed = 0 // 记录处理的文件数量

        // 计算总文件数量
        files.forEach((file) => {
          const filePath = path.join(dirPath, file)
          const stats = fs.statSync(filePath) // 使用同步方法获取文件状态
          if (stats.isDirectory()) {
            totalFiles++ // 统计目录
          } else if (file.endsWith('.jcl') || file.endsWith('.txt')) {
            totalFiles++ // 统计目标文件
          }
        })

        let obj = {}
        files.forEach((file) => {
          const filePath = path.join(dirPath, file)
					const nameList = dirPath?.split('/')
					let name = ''
					if (nameList?.length) {
						name = nameList[nameList.length - 1]
					}
          const stats = fs.statSync(filePath) // 使用同步方法获取文件状态

          if (stats.isDirectory()) {
            // 递归处理子目录
            readDirectory(filePath)
              .then(() => {
                filesProcessed++
                if (filesProcessed === totalFiles) {
                  resolve() // 所有文件处理完毕
                }
              })
              .catch((err) => {
                console.error(err)
                filesProcessed++
              })
          } else if (file.endsWith('.jcl')) {
            const 完成时间 = processJclFile(filePath,name)
            if (完成时间 > 0) {
              obj.完成帧 = 完成时间
              obj.完成时间 = formatTime(完成时间 / 16)
            } else {
              obj.完成帧 = "JCL数据异常"
              // console.log(`文件${name}`, '获取JCL异常')
            }

            filesProcessed++
          } else if (file.endsWith('.txt')) {
            const txtData = processTxtFile(filePath)
            // 合并 jcl 数据和 txt 数据
            obj = { ...obj, ...txtData }

            if (!obj.角色) {
              console.log(`文件${name}`, '获取角色异常')
              obj.角色 = name
            }
            filesProcessed++
          }
        })

        if (Object.keys(obj)?.length) {
          finalResults.push(obj)
        }

        // 检查是否所有文件都处理完
        if (filesProcessed === totalFiles) {
          resolve() // 所有文件处理完毕
        }
      })
    })
  }

  // 开始读取目录
  readDirectory(BASE_DIR)
    .then(() => {
      // 生成 Excel 文件
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(finalResults)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Results')

      // 指定输出文件路径
      const outputFilePath = path.join(BASE_DIR, '汇总统计.xlsx')
      XLSX.writeFile(workbook, outputFilePath)
      console.log('\nExcel 文件已生成:', outputFilePath)
    })
    .catch((err) => {
      console.error(err)
    })
}

main()

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  // 在秒数前补零以确保是两位数
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${minutes}:${formattedSeconds}`
}

function findTenthSmallest(arr) {
  // 去重
  const uniqueArr = [...new Set(arr)]

  // 排序数组
  uniqueArr.sort((a, b) => a - b)

  // 返回第 10 个最小的数字（索引为 9）
  return uniqueArr[9]
}
