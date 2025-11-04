import 'normalize.css'
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './js/router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css' 

const app = createApp(App);
app.use(store)
app.use(router)
app.use(Antd)
app.mount('#app')
