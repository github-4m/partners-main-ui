<template>
  <div>
    <the-header/>
    <div v-if="isModule()">
      <div v-if="isEnvironment('development')">
        <script2 type="text/javascript" v-bind:src="'/module' + module + '/app.js'"></script2>
      </div>
    </div>
    <router-view/>
    <the-footer/>
  </div>
</template>

<script>
  import TheHeader from './components/header/TheHeader';
  import TheFooter from './components/footer/TheFooter';
  import router from './router'
  import api from './api'

  export default {
    name: 'App',
    components: {TheFooter, TheHeader},
    data: () => {
      return {
        loaded: false,
        modules: []
      }
    },
    methods: {
      isEnvironment(mode) {
        return process.env.NODE_ENV === mode
      },
      isModule() {
        let self = this
        if (self.loaded) {
          self.route()
        }
        let module = window.location.pathname === '/' ? '/' : window.location.pathname.match(/^\/[a-zA-Z0-9-_]+/)[0]
        if (self.modules.includes(module)) {
          self.$store.commit('setModule', module)
          return true
        }
        return false
      },
      route() {
        let self = this
        if (window.location.pathname === '/') {
          if (self.authorized) {
            let menu = self.session.menus[0];
            let sub = menu.subs.length > 0 ? menu.subs[0] : null
            let url = typeof menu.url !== 'undefined' && menu.url !== null ? menu.url : sub !== null ? sub.url : null
            router.replace(url)
          } else {
            router.replace('/login')
          }
        }
      }
    },
    computed: {
      authorized() {
        let self = this
        return self.$store.getters.isAuthorized()
      },
      module() {
        let self = this
        return self.$store.getters.getModule
      },
      session() {
        let self = this
        return self.$store.getters.getSession
      }
    },
    mounted() {
      let self = this
      self.$nextTick(() => {
        api.user.session().then(response => {
          if (response.ok) {
            if (response.body.success) {
              self.$store.commit('setSession', response.body.value)
              self.modules = self.session.modules
              self.route()
            }
          }
          self.loaded = true
        }, response => {
          self.loaded = true
        })
      })
    }
  }
</script>

<style type="scss">
  @import "./assets/css/main.scss";
</style>
