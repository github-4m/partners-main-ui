<template>
  <li v-if="isAuthorized('STORE')" class="option" @click="dropdown($event); find();">
    <div class="notification">
      <i class="far fa-bell"/>
      <div class="counter" v-if="notificationCount !== 0">{{notificationCount | simplify}}</div>
    </div>
    <ul class="dropdown">
      <li class="notification-upper">
        {{$t('notification.title')}}<a class="pull-right" v-on:click.stop="readAll()">{{$t('notification.button.mark_all_as_read')}}</a>
      </li>
      <li class="notification-middle" v-bind:class="{'empty' : notifications.length === 0}">
        <div v-if="notifications.length === 0">
          <img src="/static/images/notification/empty.svg" alt><br>{{$t('notification.text.no_notification')}}
        </div>
        <ul class="notification-item" v-if="notifications.length > 0">
          <li v-for="notification in notifications"
              v-bind:class="{'unread' : !notification.alreadyRead}" @click="details()">
            {{notification.message}}
            <div class="details">
              <img
                v-bind:src="'/static/images/notification/' + notification.groupType.toLowerCase() + '.svg'"
                alt>&nbsp;<span>{{notification.createdDate | date}}</span>
            </div>
          </li>
        </ul>
      </li>
      <li class="notification-lower">
        <a>{{$t('notification.button.see_all_notification')}}</a>
      </li>
    </ul>
  </li>
</template>

<script>
  import SockJs from 'sockjs-client'
  import Stomp from 'webstomp-client'
  import Moment from 'moment'
  import api from '@/api'

  export default {
    name: "NotificationCenter",
    data: () => {
      return {
        loaded: {
          notification: false
        },
        modal: {
          open: false
        },
        notificationCount: 0,
        notifications: []
      }
    },
    filters: {
      simplify(value) {
        if (value > 99) {
          return '99+'
        } else {
          return value
        }
      }, date(value) {
        let date = new Date()
        if (Moment(date).format('YYYY-DD-MM') === Moment(value).format('YYYY-DD-MM')) {
          return Moment(value).format('hh:mm')
        } else {
          return Moment(date).format('DD MMMM YYYY')
        }
      }
    },
    methods: {
      connect() {
        let self = this
        self.socket = new SockJs('/web-socket/notification?storeId=10001&channelId=frontend&clientId='
          + process.env.npm_package_name + '&requestId=' + new Date().getTime())
        self.stomp = Stomp.over(self.socket)
        self.stomp.debug = () => {
        }
        self.stomp.connect({}, frame => {
          self.stomp.subscribe('/topic/' + self.session.mode.code, tick => {
            self.$data['notificationCount']++
          })
        }, error => {
        })
      },
      dropdown(event) {
        event.currentTarget.classList.toggle('active')
      },
      details() {
        let self = this
        self.modal.open = true
      },
      find() {
        let self = this
        self.notificationCount = 0
        if (!self.loaded.notification) {
          api.notification.find(0, 5).then(response => {
            if (response.ok) {
              if (response.body.success) {
                self.notifications = response.body.content
              }
            }
          }, response => {
          })
        }
        self.loaded.notification = !self.loaded.notification
      },
      readAll() {
        api.notification.readAll()
      }
    },
    computed: {
      isAuthorized() {
        let self = this
        return (mode) => {
          return self.$store.getters.isAuthorized(mode)
        }
      },
      session() {
        let self = this
        return self.$store.getters.getSession
      }
    },
    mounted() {
      let self = this
      self.$nextTick(() => {
        if (process.env.NODE_ENV === 'production') {
          self.connect()
        }
      })
    }
  }
</script>

<style scoped>
  .notification {
    font-size: 20px;
    text-align: center;
  }

  .notification .counter {
    background: #dc3545;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    color: #fff;
    font-size: 13px;
    font-weight: 800;
    padding: 1px 5px;
    position: absolute;
    top: -5px;
    right: 10px;
  }

  .notification-upper {
    border-bottom: #ddd 1px solid;
    color: #aaa;
    padding: 8px 12px;
  }

  .notification-middle {
    max-height: 300px;
    overflow-y: auto;
  }

  .notification-middle.empty {
    height: auto;
    padding: 50px 0;
    text-align: center;
  }

  .notification-middle.empty img {
    width: 100px;
  }

  .notification-lower {
    border-top: #ddd 1px solid;
    padding: 8px 12px;
    text-align: center;
  }

  .notification-item {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .notification-item > li {
    border-bottom: #ddd 1px solid;
    cursor: pointer;
    padding: 8px 12px;
  }

  .notification-item > li:last-child {
    border: none;
  }

  .notification-item > li:hover {
    background: #e5e5e5;
  }

  .notification-item > li.unread {
    background: rgba(229, 244, 251, 0.5);
  }

  .notification-item > li.unread:hover {
    background: #e5e5e5;
  }

  .notification-item > li .details {
    color: #aaa;
    margin-top: 8px;
  }

  .notification-item > li .details img {
    vertical-align: middle;
    width: 20px;
  }

  .notification-item > li .details span {
    vertical-align: middle;
  }

  .option {
    cursor: pointer;
    position: relative;
    width: 60px;
  }

  .option.active {
    background: #f5f5f5;
    color: #337ab7;
  }

  .option.active .dropdown {
    display: block;
  }

  .dropdown {
    background: #f5f5f5;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    -moz-box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .14);
    color: #333;
    cursor: default;
    display: none;
    list-style: none;
    margin: 0;
    margin-top: 18px;
    min-width: 50px;
    padding: 8px 0;
    position: absolute;
    right: 0;
    width: 350px;
    z-index: 1;
  }

</style>
