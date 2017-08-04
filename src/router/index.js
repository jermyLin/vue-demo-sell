import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods.vue'
import seller from 'components/seller/seller.vue'
import ratings from 'components/ratings/ratings.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'common/stylus/index.styl'
import 'static/css/reset.css';
Vue.use(Router);
Vue.use(VueAxios,axios);
let router = new Router({
  mode: 'history',
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      component: goods,
      redirect: '/goods',
    },
    {
      path: '/goods',
      component: goods,
    },
    {
      path: '/seller',
      component: seller,
    },
    {
      path: '/ratings',
      component: ratings,
    },
  ]
});
export default router;
