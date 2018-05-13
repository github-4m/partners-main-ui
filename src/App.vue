<template>
  <div>
    <the-header :user="user"/>
    <!-- center page -->
    <br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br>
    <the-footer :user="user"/>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader";
  import TheFooter from "./components/TheFooter";
  import api from "./api"

  export default {
    name: 'App',
    components: {TheFooter, TheHeader},
    data: () => {
      return {
        user: null
      }
    },
    mounted() {
      let self = this
      self.$nextTick(() => {
        api.user.session().then(response => {
          if (response.ok) {
            if (response.body.success) {
              self.user = response.body.value
            }
          }
        }, response => {
        })
      })
    }
  }
</script>

<style type="scss">
  @import "./assets/css/main.scss";
</style>
