import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/modules/Home"

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      component: Home,
      children: [{
        path: 'index',
        name: 'index',
        component: require("@/modules/index")
      }]
    },
    // 系统设置
    {
      path: '/system',
      component: Home,
      children: [{
        path: 'app',
        name: 'system-app',
        component: require("@/modules/system/app")
      }, {
        path: 'app2',
        name: 'system-app',
        component: require("@/modules/system/app2")
      }, {
        path: 'role',
        name: 'system-role',
        component: require("@/modules/system/role")
      }, {
        path: 'module',
        name: 'system-module',
        component: require("@/modules/system/module")
      }, {
        path: 'module-detail/:id',
        name: 'system-module-detail',
        component: require("@/modules/system/module_detail")
      }, {
        path: 'module2',
        name: 'system-module2',
        component: require("@/modules/system/module2")
      }, ]
    },
    {
      path: '*',
      redirect: '/index'
    },

  ]
})