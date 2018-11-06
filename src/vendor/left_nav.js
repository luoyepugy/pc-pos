import { mapState } from 'vuex'
import Rest from '@/rest';
import api from '@/api';
import { helper } from '@/helper';
import ChildrenNav from './child_nav.js';

export default {
  template: `<div class="cp-left-nav" :class="[isOpen ? '' : 'only-icon']">
    <ul class="nav">
      <li v-for="item in list" @mouseover="show[item.id]=true" @mouseout="show[item.id]=false">
        <Icon :type="item.icon" size="24" />
        <span v-show="isOpen==true">{{item.name}}<Icon type="ios-arrow-forward" size="22" /></span>
        <ChildrenNav :multi="true" :show="show[item.id]" :list="item.children"></ChildrenNav>
      </li>
    </ul>
  </div>`,
  data() {
    return {
      list: [],
      show: {
        sale: false,
        cash: false,
        card: false,
        bussiness: false,
        finance: false,
        statistics: false,
      },
    }
  },
  components: {
    ChildrenNav,
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    isOpen: state => state.nav.isOpen
  }),
  created() {
    this.getNav();
  },
  methods: {
    getNav() {
      Rest.get(api.menu.left).done(res => {
        if (helper.isSuccess(res)) {
          this.list = res.nav;
        } else {
          this.$Message.error(res.status.msg);
        }
      });
    }
  }
};