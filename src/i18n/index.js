import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langs from '@/lang'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  langs
})

const loadedLanguages = ['en']

