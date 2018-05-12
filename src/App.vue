<template>
  <div>
    <the-header :user="user()"/>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader";

  export default {
    name: 'App',
    components: {TheHeader},
    methods: {
      user() {
        return {
          username: 'fathan.mustaqiim@gdn-commerce.com',
          name: 'Fathan Mustaqiim',
          mode: {code: 'BLT-00001', type: 'STORE', name: 'Blibli.com Testing'},
          options: [{
            code:'store-info',
            name:'Store Info',
            url: '/store-info'
          }, {
            code:'store-user',
            name:'Store User',
            url: '/user'
          }, {
            code:'training-video',
            name:'Training Video',
            url: '/training/video'
          }, {
            code:'download-docs',
            name:'Download Docs',
            url: '/download/mta-docs.pdf'
          }, {
            code:'download-api-docs',
            name:'Download API Docs',
            url: '/download/mta-api-docs.pdf'
          }, {
            code:'switch-account',
            name:'Switch Account',
            url: '/account/reset'
          }]
        };
      }
    }
  }
</script>

<style type="scss">
  @import "./assets/css/main.scss";
</style>
