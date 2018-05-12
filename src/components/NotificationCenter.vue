<template>
  <li class="option" @click="dropdown($event)">
    <div class="notification">
      <i class="far fa-bell"/>
      <div class="counter" v-if="notificationCount !== 0">{{notificationCount | simplify}}</div>
    </div>
    <ul class="dropdown">
      <li class="notification-upper">
        NOTIFICATION<a class="pull-right">Mark all as read</a>
      </li>
      <li class="notification-middle" v-bind:class="{'empty' : notifications.length === 0}">
        <div v-if="notifications.length === 0">
          <img src="@/assets/images/notification/empty.svg" alt><br>No Notification
        </div>
        <ul class="notification-item" v-if="notifications.length > 0">
          <li v-for="notification in notifications">
            {{notification.message}}
            <div>
              {{notification.createdDate | date}}
            </div>
          </li>
        </ul>
      </li>
      <li class="notification-lower">
        <a>See all notification</a>
      </li>
    </ul>
  </li>
</template>

<script>
  import SockJs from 'sockjs-client'
  import Stomp from 'webstomp-client'
  import moment from 'moment'

  export default {
    name: "NotificationCenter",
    props: {
      storeCode: {type: String, required: false}
    },
    data: () => {
      return {
        notificationCount: 0,
        notifications: [{
          createdDate: 1526009043479,
          groupType: 'ACTIVITY',
          type: null,
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue justo quis fermentum dictum. Fusce blandit tempus arcu at posuere. Etiam semper consectetur vehicula.'
        }, {
          createdDate: 1522299762880,
          groupType: 'ACTIVITY',
          type: null,
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue justo quis fermentum dictum. Fusce blandit tempus arcu at posuere. Etiam semper consectetur vehicula.'
        }, {
          createdDate: 1522299762880,
          groupType: 'ACTIVITY',
          type: null,
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue justo quis fermentum dictum. Fusce blandit tempus arcu at posuere. Etiam semper consectetur vehicula.'
        }, {
          createdDate: 1522299762880,
          groupType: 'ACTIVITY',
          type: null,
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue justo quis fermentum dictum. Fusce blandit tempus arcu at posuere. Etiam semper consectetur vehicula.'
        }]
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
        if (moment(date).format('YYYY-DD-MM') === moment(value).format('YYYY-DD-MM')) {
          return moment(value).format('hh:mm')
        } else {
          return moment(date).format('DD MMMM YYYY')
        }
      }
    },
    methods: {
      connect() {
        let self = this
        this.socket = new SockJs('/web-socket/notification?storeId=10001&channelId=frontend&clientId=' + process.env.npm_package_name + '&requestId=' + new Date().getTime())
        this.stomp = Stomp.over(this.socket)
        this.stomp.debug = () => {
        }
        this.stomp.connect({}, frame => {
          this.stomp.subscribe('/topic/' + self.storeCode, tick => {
            this.$data['notificationCount']++
          })
        }, error => {
          console.log(error)
        })
      },
      dropdown(event) {
        event.currentTarget.classList.toggle('active')
      }
    }
  }
</script>

<style scoped>
  .notification {
    font-size: 20px;
    position: relative;
    text-align: center;
  }

  .notification .counter {
    background: #dc3545;
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

  .dropdown > li.splitter {
    border-bottom: #ddd 1px solid;
    margin: 8px 0;
  }
</style>
