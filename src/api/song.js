import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function jsonp(urlObj, callback) {
  let url = urlObj.url
  let callbackName = urlObj.jsonpCallback

  window[callbackName] = function(data) {
    window[callbackName] = undefined
    document.body.removeChild(script)
    callback(data)
  }

  let script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
}
