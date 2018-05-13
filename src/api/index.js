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
    if (401 === response.status) {
      // redirect to login page
    }
  }
})

const api = {
  user: {
    session: () => {
      return Vue.http.get('/api/user/session')
    }
  }
}

export default api
