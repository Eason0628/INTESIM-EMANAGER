import 'normalize.css'
import './style/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './js/router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css' 
import i18n from "@common/locale";

const app = createApp(App);
app.use(store)
app.use(router)
app.use(Antd)
app.use(i18n)
app.mount('#app')
