export default {
  template: `<div class="cp-breadcrumb">
    <Breadcrumb>
      <BreadcrumbItem to="/index">首页</BreadcrumbItem>
      <BreadcrumbItem v-for="(item,index) in list" :key="item.name" :to="item.path">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="icons">
      <slot name="icon"></slot>
      <span><Icon type="ios-help-circle-outline" size="22" />帮助</span>
    </div>
  </div>`,
  data() {
    return {

    }
  },
  props: {
    list: Array
  },
  methods: {

  }
};