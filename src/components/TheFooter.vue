<template>
  <div class="footer">
    <div class="row">
      <ul class="footer-block">
        <li>
          <div class="title">{{$t('footer.text.support')}}</div>
          <div v-if="!isAuthorized()">
            <a id="how-to-sell" href="https://www.blibli.com/pages/merchant-corner#how">{{$t('footer.button.how_to_sell')}}</a><br><a
            id="about-blibli" href="https://www.blibli.com/panduan-belanja#hash-side-tentangBlibli">{{$t('footer.button.about_blibli')}}</a>
          </div>
          <div v-if="isAuthorized()">
            <a id="information-center">{{$t('footer.button.information_center')}}</a><br><a
            id="tutorial">{{$t('footer.button.tutorial')}}</a><br><a id="user-guide">{{$t('footer.button.user_guide')}}</a>
          </div>
        </li>
        <li>
          <div class="title">{{$t('footer.text.merchant_care')}}</div>
          <div>
            <i class="fas fa-phone"/>&nbsp;021-57977777<br><a
            href="mailto:merchant.care@blibli.com"><i class="far fa-envelope"/>&nbsp;merchant.care@blibli.com</a>
          </div>
        </li>
        <li>
          <div class="title">{{$t('footer.text.blibli')}}</div>
          <div>
            <a id="blibli" href="https://www.blibli.com">{{$t('footer.button.shop_on_blibli')}}</a>
          </div>
        </li>
        <li>
          <div class="title">{{$t('footer.text.seller_app')}}</div>
          <div>
            <a id="android-app"
               href="https://play.google.com/store/apps/details?id=com.gdn.blibli.mta"><img
              class="seller-app" src="/static/images/footer/android-app.svg" alt></a>
          </div>
        </li>
      </ul>
      <div class="copyright">
        Copyright © 2011-{{copyright()}} PT. Global Digital Niaga. Powered by Blibli.com. <a
        href="https://www.blibli.com/pages/mta-app-privacy">{{$t('footer.button.privacy_policy')}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TheFooter",
    props: {
      user: {type: Object, required: false}
    },
    methods: {
      isAuthorized() {
        let self = this
        return typeof self.user !== 'undefined' && self.user !== null
      },
      copyright() {
        let date = new Date()
        return date.getFullYear()
      }
    }
  }
</script>

<style scoped>
  .footer {
    border-top: #ddd 1px solid;
  }

  .footer .copyright {
    border-top: #ddd 1px solid;
    padding: 8px 0;
    text-align: center;
  }

  .footer img.seller-app {
    width: 115px;
  }

  .footer-block {
    display: table;
    list-style: none;
    margin: 0;
    padding: 20px 0;
    width: 100%;
  }

  .footer-block > li {
    display: table-cell;
    vertical-align: top;
    width: 25%;
  }

  .footer-block > li .title {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 10px;
  }
</style>
