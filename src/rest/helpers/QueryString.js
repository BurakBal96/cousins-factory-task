// import queryString from 'qs'
import queryString from 'query-string'

export class qs {
  static parse = (
    search,
    defaults = {},
    options = {ignoreQueryPrefix: true}
  ) => {
    // const params = qs.parse(location.search)
    const params = queryString.parse(search, options)
    return {...defaults, ...params} // !IMPORTANT for deps
  }

  static stringify = (
    parsed,
    options = {skipNull: true, skipEmptyString: true}
  ) => {
    return queryString.stringify(parsed, options)
  }
}
