import { mapState } from 'vuex'
import HeaderNav from './head_nav';
import LeftNav from './left_nav';

export default {
  template: `<div id="wrapper" class="wrapper">
    <div class="container">
      <!-- 顶部菜单START -->
      <HeaderNav></HeaderNav>
      <!-- 顶部菜单END -->
      <!-- 左边菜单START -->
      <LeftNav></LeftNav>
      <!-- 左边菜单END -->
      <!-- router view -->
      <keep-alive>
        <router-view class="view" :class="[isOpen ? '' : 'pl70']"></router-view>
      </keep-alive>
    </div>
  </div>`,
  data() {
    return {}
  },
  components: {
    HeaderNav,
    LeftNav,
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    isOpen: state => state.nav.isOpen,
  }),
  methods: {

  },
};