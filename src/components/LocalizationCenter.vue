<template>
  <li class="option">
    <div class="locale">{{locale()}}</div>
    <ul class="dropdown">
      <li v-for="locale in locales"><a @click="loadLocale(locale.code)">{{locale.description}}</a>
      </li>
    </ul>
  </li>
</template>

<script>
  import i18n from '@/i18n'

  export default {
    name: "LocalizationCenter",
    data: () => {
      return {
        locales: [{
          code: 'en',
          description: 'EN (English)'
        }, {
          code: 'in',
          description: 'IN (Bahasa)'
        }],
        loadedLocales: ['en']
      }
    },
    methods: {
      locale() {
        return i18n.locale.toUpperCase()
      },
      loadLocale(lang) {
        let self = this
        if (i18n.locale !== lang) {
          if (!self.loadedLocales.includes(lang)) {
            import ('@/langs/' + lang).then(result => {
              let messages = result.default[lang]
              i18n.setLocaleMessage(lang, messages)
              i18n.locale = lang
              self.loadedLocales.push(lang)
              localStorage.setItem('lang', lang)
            })
          } else {
            i18n.locale = lang
            localStorage.setItem('lang', lang)
          }
        }
      },
    },
    mounted() {
      let self = this
      self.$nextTick(() => {
        let lang = localStorage.getItem('lang')
        if (lang === undefined || lang === null) {
          localStorage.setItem('en')
        } else {
          self.loadLocale(lang)
        }
      })
    }
  }
</script>

<style scoped>
  .locale {
    font-size: 20px;
    text-align: center;
  }

  .option:hover .dropdown {
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
</style>
