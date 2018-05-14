import Vue from 'vue'
import Resource from 'vue-resource'
import ResourceMock from 'vue-resource-mock'
import apimock from '@/api-mock'

Vue.use(Resource)
if (process.env.NODE_ENV === 'development') {
  Vue.use(ResourceMock, apimock)
}

Vue.http.interceptors.push((request) => {
  return (response) => {
    if (401 === response.status || (request.url === '/api/user/session' && !response.ok)) {
      window.location.href = '/'
    }
  }
})

const params = (params) => {
  let temp = {
    storeId: '10001',
    channelId: 'frontend',
    clientId: 'partners-main-ui',
    requestId: new Date().getTime()
  }
  if (typeof params !== 'undefined' && params !== null) {
    for (let i in params) {
      temp[i] = params[i]
    }
  }
  return temp
}

const api = {
  user: {
    session: () => {
      return Vue.http.get('/api/user/session', {params: params()})
    }
  },
  notification: {
    find: (page, size) => {
      return Vue.http.get('/api/notification/filter', {params: params({page: page, size: size})})
    },
    readAll: () => {
      return Vue.http.put('/api/notification/read-all', null, {params: params()})
    }
  }
}

export default api
