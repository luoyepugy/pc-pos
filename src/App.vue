<template>
  <div id="app">
    <transition :name="transName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'

export default {
  name: 'App',
  data() {
    return {
      transName: '',
      routeData: {},
    }
  },
  methods: {
    /* 公共跳转新页面方法
     * 参数：route 路由对象, transName 页面切换动画名, data 非URL传参
     */
    go(route, transName, data = {}) {
      // 参数位移
      if (typeof transName === 'object') {
        data = transName
        transName = undefined
      }
      // 默认切换动画
      this.transName = (transName || transName === '') ? transName : 'transright'

      // 设置页面参数
      this.routeData = $.extend(true, {}, data);
      // 页面切换
      this.$nextTick(function() {
        this.$router.push(route)
      })
    },
  },
  mounted() {
    // DOM ready
  },
  beforeRouteEnter(to, from, next) {
    // 导航进入该组件时调用
    // 不！能！获取组件实例 `this`
    // 因为组件实例还没被创建

    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件时调用
    // 可以访问组件实例 `this`

    // 不要忘了next
    next();
  }
}

</script>
