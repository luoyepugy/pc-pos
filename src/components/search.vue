<template>
  <div class="cp-search" v-if="isShow" @click="clickWrap">
    <div class="search-wrap">
      <span class="inp-wrap">
              <input @blur="searchDetect(searchText,$event)" @focus="searchFocus()" @keyup.enter="searchDetect(searchText,$event,2)" @click="searchClick()" @input="inputSearch" class="inp" type="text" v-model="searchText" :placeholder="placeholderText" >
              <i v-if="showClear&&clear" @click="clearText" class="c-icon36 c-icon-clear"></i>
          </span>
    </div>
    <button class="c-btn cancel-btn" v-show="showCancel" @click="cancelClick">取消</button>
  </div>
</template>
<script type="text/ecmascript-6">
export default {

  //==数据配置===
  data() {
    return {
      enableSearch: true,
      clear: false,
    }
  },
  props: {
    isShow: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    isImmediately: {
      default: false,
      type: Boolean,
    },
    showCancel: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    showClear: {
      default: false,
      type: Boolean
    },
    enter: {
      default: function() {},
      type: Function
    },
    endEnter: {
      default: function() {},
      type: Function
    },
    change: {
      default: function() {},
      type: Function
    },
    cancel: {
      default: function() {},
      type: Function
    },
    placeholderText: {
      default: '请输入',
      type: String
    },
    searchText: {
      default: '',
      type: String
    },
    clickSearch: {
      default: function() {},
      type: Function,
      twoWay: true
    }
  },
  created() {

  },
  watch: {
    'isShow' (val) {
      if (val) {
        this.enableSearch = true;
      }
    },
    'searchText' (val) {
      if (this.isImmediately) {
        this.enter();
      }
      this.clear = (val && this.showClear) ? true : false;
    }
  },
  methods: {
    cancelClick() {
      this.showLabelList = false;
      this.enableSearch = false;
      this.searchText = '';
      this.cancel();
    },
    clearText() {
      this.searchText = '';
      if (!this.isImmediately) {
        this.enter();
      }
      this.$emit('clear');
    },
    searchDetect(searchText, event, type = 1) {
      if (type == 1) {
        this.$emit('inpblur');
      }
      var that = this;
      setTimeout(function() {
        if (that.enableSearch) {
          that.enter(searchText);
          that.endEnter();
          if (type == 2) {
            event.target.blur(); //取消焦点，防止多次查询
            that.enableSearch = false;
          }
        }
      }, 50);
    },
    searchFocus() {
      this.enableSearch = true;
      this.$emit('inpfocus');
    },
    searchClick() {
      this.clickSearch();
    },
    inputSearch() {
      this.change();
    },
    clickWrap() {
      this.$emit('clickwrap');
    }
  }
}

</script>
