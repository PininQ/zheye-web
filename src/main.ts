import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import router from '@/router'
import store from '@/store'
import App from './App.vue'

axios.interceptors.request.use((config) => {
  config.params = { ...config.params }
  store.commit('setError', { status: false, message: '' })
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(
  (config) => {
    store.commit('setLoading', false)
    return config
  },
  (e) => {
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
  },
)

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
