import { mapState } from 'vuex'

export default {
  template: `<div v-show="isShow" class="cp-children-nav" :style="{width: widthCalc(list || []), left: left}" :class="[isLeftNav ? 'left' : 'top']">
    <ul v-show="!isMulti">
      <li v-for="item in list" @click="go(item.route)" v-show="!isMulti">
        <Icon :type="item.icon" :size="24" />{{item.name}}
      </li>
    </ul>
    <dl v-show="isMulti" v-for="item in list" :style="{width: item.width}">
      <dt>
        <Icon :type="item.icon" :size="24" />{{item.name}}</dt>
      <dd v-for="child in item.children" @click="go(child.route)">{{child.name}}</dd>
    </dl>
  </div>`,
  data() {
    return {
      isShow: this.show,
      isMulti: this.multi,
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.nav.isOpen,
    }),
    left() {
      return this.isLeftNav ? this.isOpen ? '179px' : '50px' : 'auto';
    },
  },
  props: {
    list: Array,
    show: Boolean,
    multi: Boolean,
    isLeftNav: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    show(val) {
      this.isShow = val;
    },
    multi(val) {
      this.isMulti = val;
    },
  },
  methods: {
    widthCalc(list) {
      if (this.isMulti) return list.length * 180 + 'px';
    },
    go(name) {
      this.$router.push({ name: name });
      this.isShow = false;
    }
  }
};