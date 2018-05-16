import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    module: null,
    session: null
  },
  getters: {
    isAuthorized: (state) => (mode) => {
      let session = state.session
      if (typeof mode === 'undefined' || mode === null) {
        return session !== null
      } else {
        return session !== null && mode === session.mode.type
      }
    },
    getModule: (state) => {
      return state.module
    },
    getSession: (state) => {
      return state.session
    }
  },
  mutations: {
    setModule: (state, module) => {
      state.module = module
    },
    setSession: (state, session) => {
      state.session = session
    }
  }
})

export default store
