import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ForgotPass from './views/ForgotPass.vue'
import ResetPass from './views/ResetPass.vue'
import AccSettings from './views/AccSettings.vue'
import ChangePass from './views/ChangePass.vue'

import Userx from './views/entities/Userx/Userx.vue'
import CreateUserx from './views/entities/Userx/CreateUserx.vue'
import UpdateUserx from './views/entities/Userx/UpdateUserx.vue'
import ViewUserx from './views/entities/Userx/ViewUserx.vue'

import AdminDocs from './views/admin/Docs.vue'
import AdminHealth from './views/admin/Health.vue'
import AdminAudits from './views/admin/Audits.vue'
import AdminLogs from './views/admin/Logs.vue'
import AdminConfig from './views/admin/Config.vue'
import AdminMetrics from './views/admin/Metrics.vue'
import AdminPushNotification from './views/admin/PushNotification.vue'

//import Detail from './views/entities/mDetail/Detail.vue'

/*import Vendor from './views/entities/vendor/Vendor.vue'
import CreateVendor from './views/entities/vendor/CreateVendor.vue'
import ChangeVendor from './views/entities/vendor/ChangeVendor.vue'
import ViewVendor from './views/entities/vendor/ViewVendor.vue'

import Product from './views/entities/product/Product.vue'
import CreateProduct from './views/entities/product/CreateProduct.vue'
import ChangeProduct from './views/entities/product/ChangeProduct.vue'
import ViewProduct from './views/entities/product/ViewProduct.vue'

import VendorBid from './views/entities/vendorbid/VendorBid.vue'
import CreateVendorBid from './views/entities/vendorbid/CreateVendorBid.vue'
import ChangeVendorBid from './views/entities/vendorbid/ChangeVendorBid.vue'
import ViewVendorBid from './views/entities/vendorbid/ViewVendorBid.vue'

import VendorBidP from './views/entities/vendorbidp/VendorBidP.vue'*/
/*
import CreateVendorBidP from './views/CreateVendorBidP.vue'
import ChangeVendorBidP from './views/ChangeVendorBidP.vue'
import ViewVendorBidP from './views/ViewVendorBidP.vue'
*/

import {getProfile} from './store/identity'

import masterSlaveRoutes from './masterSlaveRoutes'



let routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/forgot',
      name: 'forgotpass',
      component: ForgotPass,
    },
    {
      path: '/reset',
      name: 'resetpass',
      component: ResetPass,
    },
    {
      path: '/account',
      name: 'account',
      component: AccSettings,
    },  
    {
      path: '/changepass',
      name: 'changepass',
      component: ChangePass,
    },
    {
      path: '/admin/userx',
      name: 'Userx',
      component: Userx,
    },
    {
      path: '/admin/userx/new',
      name: 'newUserx',
      component: CreateUserx,
    },
    {
      path: '/admin/userx/edit/:id',
      name: 'editUserx',
      component: UpdateUserx,
    },    
    {
      path: '/admin/userx/view/:id',
      name: 'viewUserx',
      component: ViewUserx,
    },
    {
      path: '/admin/docs',
      name: 'admindocs',
      component: AdminDocs,
    },
    {
      path: '/admin/health',
      name: 'adminhealth',
      component: AdminHealth,
    },
    {
      path: '/admin/audits',
      name: 'adminaudits',
      component: AdminAudits,
    },
    {
      path: '/admin/logs',
      name: 'adminlogs',
      component: AdminLogs,
    },
    {
      path: '/admin/config',
      name: 'adminconfig',
      component: AdminConfig,
    },
    {
      path: '/admin/metrics',
      name: 'adminmetrics',
      component: AdminMetrics,
    },
    {
      path: '/admin/pushNotification',
      name: 'adminPushNotification',
      component: AdminPushNotification,
    },
    {
      path: '/user/activate',
      name:'userActivate',
      beforeEnter: (to, from, next) => {
        axios.get('activate?key='+to.query.key)
        .then(data=>next('/'))
        .catch(err=>next('/'));
      }
    },
    {
      path: '/reset',
      name:'userResetKey',
      beforeEnter: (to, from, next) => {
        axios.get('reset?key='+to.query.key)
        .then(data=>next('/'))
        .catch(err=>next('/'));
      }
    },
  ];
  let context = require('./views/entities').default;
  let views = {};
  if(context.length) {
    console.log(context)
    context.forEach(c=> {
      routes.push(...c); 
    });
  }
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
let guestRoutes = ['login','register','forgot', 'reset']
router.beforeEach((to, from, next) => {
  let path = to.fullPath.substr(1);
  let jwt = getProfile() && getProfile().jwt;
  let profile = getProfile();
  if(jwt && guestRoutes.includes(path)) {
    return next('/');
  }
  if(jwt && !profile.roles.includes('ROLE_ADMIN') && to.fullPath.includes('admin')) {
    return next('/')
  }
  if(!jwt && (to.fullPath.includes('entities') || to.fullPath.includes('admin'))) {
    return next('/login');
  }
  //inserthere
  return next();
})


export default router