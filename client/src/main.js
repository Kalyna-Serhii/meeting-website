import { createApp } from 'vue';
import VueCookies from 'vue-cookies';
import App from '@/App.vue';
import router from '@/router/router';
import store from '@/store/store';

import '@/assets/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Alert from '@/UI/Alert.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';

library.add(fas, fab, far);

const app = createApp(App);

app
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .component('alert', Alert)
  .use(router)
  .use(store)
  .use(VueCookies)
  .mount('#app');
