import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

// 响应的拦截器
axios.interceptors.response.use(success => { // data 是服务端返回的json   -- success.data.status 是返回json里的状态码，前面的是 http响应码
  if (success.status && success.status === 200 && success.status === 500) {
    Message.error({
      message: success
    })
    return // return空，在请求调用的地方什么数据都拿不到，在请求调用的地方判断有没有数据，如果没数据说明请求是失败的。失败的错误信息不用管
  }
  if (success) { // 如果返回的有成功的msg就给你弹出来
    Message.success({ message: success })
  }
  return success // return 到请求调用的地方，拿到服务器返回的json
},
error => {
  if (error.response === 504 || error.response === 404) {
    Message.error({
      message: '服务器被吃了o(╯□╰)o'
    })
  } else if (error.response === 403) {
    Message.error({
      message: '权限不足，请联系管理员'
    })
  } else if (error.response === 401) {
    Message.error({
      message: '尚未登录，请登录'
    })
    router.replace('/') // 回到登录页
  } else {
    if (error.respons) {
      Message.error({
        message: error.response // 展示服务端自己返回回来的错误信息
      })
    } else {
      Message.error({
        message: '未知错误！'
      })
    }
  }
  return
})

const base = ''

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}

export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}
