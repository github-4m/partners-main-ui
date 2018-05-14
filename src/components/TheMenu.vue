<template>
  <div v-if="isAuthorized()" class="menu">
    <div class="row">
      <ul class="menu-block">
        <li v-for="menu in user.menus" v-bind:class="{'submenu' : menu.subs.length > 0}">
          <a>{{$t('menu.button.' + menu.code.replace(/-/g, '_'))}}<span v-if="menu.subs.length > 0">&nbsp;<i
            class="fas fa-chevron-down"/></span></a>
          <ul v-if="menu.subs.length" class="submenu-block">
            <li v-for="sub in menu.subs"><a>{{$t('menu.button.' + sub.code.replace(/-/g, '_'))}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TheMenu",
    props: {
      user: {type: Object, required: false}
    },
    methods: {
      isAuthorized() {
        let self = this
        return typeof self.user !== 'undefined' && self.user !== null
      }
    }
  }
</script>

<style scoped>
  .menu {
    background: #337ab7;
  }

  .menu-block {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .menu-block > li {
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }

  .menu-block > li:hover {
    background: #286090;
  }

  .menu-block > li a {
    color: #fff;
    display: block;
    padding: 8px 12px;
    white-space: nowrap;
  }

  .submenu {
    position: relative;
  }

  .submenu:hover .submenu-block {
    display: block;
  }

  .submenu-block {
    background: #286090;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    -moz-box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    color: #fff;
    display: none;
    list-style: none;
    margin: 0;
    min-width: 120px;
    padding: 8px 0;
    position: absolute;
    right: 0;
    z-index: 1;
  }

  .submenu-block > li {
    text-align: left;
  }

  .submenu-block > li:hover {
    background: #23527b;
  }

  .submenu-block > li a {
    color: #fff;
    display: block;
    padding: 8px 12px;
    white-space: nowrap;
    width: auto;
  }
</style>
