function useQuery(target?) {
  function getQueryParams() {
    const url = location?.href
    const queryString = url.split('?')[1]
    if (!queryString) {
      return {}
    }

    const queryParams = {}
    const pairs = queryString.split('&')

    for (const pair of pairs) {
      const [key, value] = pair.split('=')
      queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '')
    }

    return queryParams
  }

  return target ? getQueryParams()?.[target] : getQueryParams()
}

export default useQuery
