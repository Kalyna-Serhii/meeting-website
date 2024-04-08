import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from "@/store/store";

import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Alert from './/UI/Alert.vue';
library.add( fas, fab, far );

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const VueCookies = require('vue-cookies');

const app = createApp(App)

app
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('alert', Alert)
    .use(router)
    .use(store)
    .use(VueCookies)
    .mount('#app')