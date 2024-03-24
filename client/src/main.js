

import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from "@/store/store";

import './assets/main.css'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app')