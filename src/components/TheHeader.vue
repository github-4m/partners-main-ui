<template>
  <div class="header">
    <div class="row">
      <ul class="header-block">
        <li>
          <a id="blibli-logo" href="https://merchant.blibli.com"><img
            src="https://www.static-src.com/resources/images/logo-blibli.png" alt></a>
        </li>
        <li>
          <div>
            <span class="application-name">Merchant Tool Application</span>
          </div>
          <div v-if="isAuthorized('STORE')">
            <span class="store-name">{{user.mode.name}}</span>
          </div>
        </li>
        <localization-center/>
        <notification-center v-if="isAuthorized('STORE')" :storeCode="user.mode.code"/>
        <li v-if="isAuthorized()" class="option">
          <div class="user">
            <i class="far fa-user"/>
          </div>
          <ul class="dropdown">
            <li class="user-details">
              <div class="name">{{user.name}}</div>
              <div class="email">{{user.username}}</div>
            </li>
            <li class="splitter"/>
            <li v-for="option in user.options"><a v-bind:id="option.code" v-bind:href="option.url">
              {{$t('header.button.' + option.code.replace(/-/g, '_'))}}</a>
            </li>
            <li class="splitter"/>
            <li><a>{{$t('header.button.change_password')}}</a></li>
            <li><a>{{$t('header.button.sign_out')}}</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NotificationCenter from "./NotificationCenter";
  import LocalizationCenter from "./LocalizationCenter";

  export default {
    name: "TheHeader",
    components: {LocalizationCenter, NotificationCenter},
    props: {
      user: {type: Object, required: false}
    },
    methods: {
      isAuthorized(mode) {
        let self = this
        if (typeof mode === 'undefined' || mode === null) {
          return typeof self.user !== 'undefined' && self.user !== null
        } else {
          return typeof self.user !== 'undefined' && self.user !== null && mode
            === self.user.mode.type
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    background: #fff;
    border-top: #337ab7 3px solid;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .14);
    -moz-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .14);
    -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .14);
  }

  .header a {
    display: inline-block;
  }

  .header .application-name {
    font-size: 25px;
    font-weight: 400;
  }

  .header .store-name {
    color: #337ab7;
    font-size: 16px;
    font-weight: 800;
  }

  .header .user {
    font-size: 20px;
    text-align: center;
  }

  .header .user-details {
    padding: 5px 12px;
  }

  .header .user-details .name {
    color: #337ab7;
    font-size: 18px;
    font-weight: 800;
    white-space: nowrap;
  }

  .header .user-details .email {
    white-space: nowrap;
  }

  .header-block {
    display: table;
    height: 60px;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .header-block > li {
    display: table-cell;
    vertical-align: middle;
  }

  .header-block > li:first-child {
    width: 225px;
  }

  .header-block > li.option {
    cursor: pointer;
    position: relative;
    width: 60px;
  }

  .header-block > li.option:hover {
    background: #f5f5f5;
    color: #337ab7;
  }

  .header-block > li.option:hover .dropdown {
    display: block;
  }

  .dropdown {
    background: #f5f5f5;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    -moz-box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    color: #333;
    display: none;
    list-style: none;
    margin: 0;
    margin-top: 18px;
    min-width: 50px;
    padding: 8px 0;
    position: absolute;
    right: 0;
    z-index: 1;
  }

  .dropdown > li:hover {
    background: #e5e5e5;
  }

  .dropdown > li a {
    color: #333;
    display: block;
    padding: 5px 12px;
    text-decoration: none;
    white-space: nowrap;
    width: auto;
  }

  .dropdown > li.splitter {
    border-bottom: #ddd 1px solid;
    display: block;
    margin: 8px 0;
  }

</style>
