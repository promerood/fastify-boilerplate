interface IQueryVars {
  [x: string]: any
}

const appendQueryString = (url: string, queryVars: IQueryVars) => {
  const firstSeperator: string = url.indexOf('?') === -1 ? '?' : '&'
  const queryStringParts: string[] = []
  for (const key in queryVars) {
    if (queryVars[key]) {
      if (Array.isArray(queryVars[key])) {
        const array: any[] = queryVars[key]
        for (const item of array) {
          queryStringParts.push(key + '=' + item)
        }
      } else {
        queryStringParts.push(key + '=' + queryVars[key])
      }
    }
  }
  const queryString = queryStringParts.join('&')
  return url + firstSeperator + queryString
}

export default appendQueryString
