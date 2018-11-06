<template>
  <div v-show="isShow" class="cp-children-nav" :style="{width: widthCalc(list || []), left: left}" :class="[isLeftNav ? 'left' : 'top']">
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
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from 'vuex'

export default {
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
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.cp-children-nav {
  @include color(#22282e, #959FA9);
  z-index: 10;
  min-width: 150px;
  overflow: hidden;

  &.top {
    @include position(absolute, right 0, top 49);
  }

  &.left {
    @include position(absolute, left 179, top 0);
  }

  ul,
  dl {
    padding: 8px 0;
  }

  li {
    @include line-height(35);
    cursor: pointer;
    position: relative;
    padding: 0 13px;
    display: block;

    &:hover {
      @include color(#293038, #fff);
    }
  }

  dl {
    display: inline-block;
    width: 150px;
    vertical-align: top;
    position: relative;

    &::before {
      content: '';
      @include list(width 1, height 800);
      @include position(absolute, right 0, top -10);
      background: #959FA9;
    }

    &:last-child::before {
      width: 0;
    }
  }

  dt {
    padding-left: 13px;
    @include line-height(30);
  }

  dd {
    padding-left: 36px;
    @include line-height(30);

    &:hover {
      @include color(#22282e, #fff);
    }
  }
}
</style>