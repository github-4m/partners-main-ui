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

  export default {
    name: 'App',
    components: {TheFooter, TheHeader},
    data: () => {
      return {
        user: {
          username: 'fathan.mustaqiim@gdn-commerce.com',
          name: 'Fathan Mustaqiim',
          mode: {code: 'BLT-00001', type: 'STORE', name: 'Blibli.com Testing'},
          options: [{
            code: 'store-information',
            name: 'Store Info',
            url: null
          }, {
            code: 'user-management',
            name: 'User Management',
            url: null
          }, {
            code: 'training-video',
            name: 'Training Video',
            url: null
          }, {
            code: 'download-docs',
            name: 'Download Docs',
            url: null
          }, {
            code: 'download-api-docs',
            name: 'Download API Docs',
            url: null
          }, {
            code: 'switch-account',
            name: 'Switch Account',
            url: '/account/reset'
          }]
        }
      }
    }
  }
</script>

<style type="scss">
  @import "./assets/css/main.scss";
</style>
