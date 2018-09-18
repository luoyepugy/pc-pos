<template>
  <div class="view-system-app">
    <crumb :list="crumbList"></crumb>
    <div class="content">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import consts from '@/utils/consts';
import Rest from '@/rest';
import Helper from '@/helper';

export default {
  data() {
    return {
      crumbList: [{
        name: '系统设置',
      }, {
        name: '角色权限'
      }],
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>