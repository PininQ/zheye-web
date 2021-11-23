import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import router from '@/router'
import store from '@/store'
import App from './App.vue'

axios.interceptors.request.use((config) => {
  config.params = { ...config.params }
  return config
})
// axios.get('/api/columns?currentPage=1&pageSize=6').then((resp) => {
//   console.log(resp.data)
// })

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
