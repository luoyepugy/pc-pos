<template>
  <div id="wrapper" class="wrapper">
    <div class="container">
      <!-- 顶部菜单START -->
      <header-nav></header-nav>
      <!-- 顶部菜单END -->
      <!-- 左边菜单START -->
      <left-nav></left-nav>
      <!-- 左边菜单END -->
      <!-- router view -->
      <keep-alive>
        <router-view class="view" :class="[isOpen ? '' : 'pl70']"></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    isOpen: state => state.nav.isOpen,
  }),
  methods: {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.view {
  &.pl70 {
    padding-left: 70px;
  }
}

</style>
