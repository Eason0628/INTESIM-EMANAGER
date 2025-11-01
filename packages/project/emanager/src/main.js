import 'normalize.css'
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './js/router'
import store from './store'

const app = createApp(App);
app.use(store)
app.use(router)
app.mount('#app')
