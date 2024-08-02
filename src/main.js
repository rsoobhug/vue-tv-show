import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'


createApp(App).use(router).mount('#app')

// const app = createApp(App)

// app.use(createPinia())

// app.mount('#app')
