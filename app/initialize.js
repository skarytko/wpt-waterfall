import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import math from 'mathjs';
import url from 'url';

import routes from './routes';
import App from './components/app.vue';

// extensions
Vue.use(VueRouter);

// router
const router = new VueRouter({
  history: true,
  routes: routes
});

// initialize app
const app = new Vue({
  router: router,
  render: function(createElement) {
    return createElement(App);
  }
}).$mount('#app');
