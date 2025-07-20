export function parse(content) {
  let index = 0
  const result = {}
  let key_flag = false
  const code_flags: number[] = []
  let str_flag = false
  let key = ''
  let string = ''
  let ret = {}
  let num = ''
  let i = 0

  while (i < content.length) {
    const c = content[i]
    if (c === '{') {
      code_flags.push(i + 1)
    } else if (c === '}' && code_flags.length > 0) {
      const start = code_flags.pop()
      if (code_flags.length === 0) {
        ret = parse(content.slice(start, i))
      }
    } else if (code_flags.length > 0) {
      // 嵌套结构中跳过处理
    } else if (c === '"') {
      str_flag = !str_flag
    } else if (str_flag) {
      string += c
    } else if (c === ']') {
      key_flag = false
    } else if (key_flag) {
      key += c
    } else if (c === '[') {
      key_flag = true
    } else if (c === '=') {
      index = parseInt(key, 10) - 1
      key = ''
    } else if (c === ',' && !str_flag) {
      if (Object.keys(ret).length > 0) {
        result[index.toString()] = ret
        ret = {}
      } else if (num) {
        result[index.toString()] =
          num === 'true' ? true : num === 'false' ? false : parseInt(num, 10)
        num = ''
      } else {
        result[index.toString()] = string
        string = ''
      }
      index++
    } else {
      num += c
    }
    i++
  }

  // 处理剩余数据
  if (Object.keys(ret).length > 0) {
    result[index.toString()] = ret
  } else if (num) {
    result[index.toString()] = num === 'true' ? true : num === 'false' ? false : parseInt(num, 10)
  } else if (string) {
    result[index.toString()] = string
  }
  return result
}

export function parse_lua(lua_data) {
  const trimmed = lua_data.trim()
  return parse(trimmed.slice(1, -1))
}
