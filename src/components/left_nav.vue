<template>
  <div class="cp-left-nav" :class="[isOpen ? '' : 'only-icon']">
    <ul class="nav">
      <li v-for="item in list" @mouseover="show[item.id]=true" @mouseout="show[item.id]=false">
        <Icon :type="item.icon" size="24" />
        <span v-show="isOpen==true">{{item.name}}<Icon type="ios-arrow-forward" size="22" /></span>
        <ChildrenNav :width="item.childMenu" :multi="true" :show="show[item.id]" :list="childMenu[item.id]"></ChildrenNav>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from 'vuex'

export default {
  data() {
    return {
      list: [
        { id: 'sale', icon: 'ios-card-outline', name: '营促销' },
        { id: 'cash', icon: 'ios-card-outline', name: '收银管理' },
        { id: 'card', icon: 'ios-card-outline', name: '卡券管理' },
        { id: 'bussiness', icon: 'ios-card-outline', name: '招商管理' },
        { id: 'finance', icon: 'ios-card-outline', name: '财务管理' },
        { id: 'statistics', icon: 'ios-card-outline', name: '统计报表' },
      ],
      show: {
        sale: false,
        cash: false,
        card: false,
        bussiness: false,
        finance: false,
        statistics: false,
      },
      childMenu: {
        sale: [{
          name: '会员管理',
          width: '190px',
          icon: 'ios-document-outline',
          children: [{
              name: '销售积分管理',
              route: 'system-module'
            }, {
              name: '会员折扣管理',
              route: 'system-module'
            },
            {
              name: '积分价值管理',
              route: 'system-module'
            }, {
              name: '专柜会员折扣',
              route: 'system-module'
            }, {
              name: '专柜积分价值分摊',
              route: 'system-module'
            }
          ]
        }, {
          name: '促销活动',
          width: '160px',
          icon: 'ios-document-outline',
          children: [{
            name: '活动设置',
            route: 'system-module'
          }, {
            name: '活动审核',
            route: 'system-module'
          }]
        }, {
          name: '营运管理',
          width: '190px',
          icon: 'ios-document-outline',
          children: [{
              name: '通知广告管理',
              route: 'system-module'
            }, {
              name: '月目标维护',
              route: 'system-module'
            },
            {
              name: '物业扣率调整单',
              route: 'system-module'
            }, {
              name: '扣率调整单',
              route: 'system-module'
            }, {
              name: '常见问题管理',
              route: 'system-module'
            }, {
              name: '操作手册管理',
              route: 'system-module'
            }
          ]
        }],
        cash: [],
        card: [],
        bussiness: [],
        finance: [],
        // statistics: [],
      }
    }
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    isOpen: state => state.nav.isOpen
  }),
  methods: {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cp-left-nav {
  @include list(width 180, height 100vh, font-size 14);
  @include color(#293038, #959FA9);
  @include position(absolute, left 0);
  &.only-icon {
    width: 50px;
  }
  .nav {
    li {
      @include line-height(45);
      cursor: pointer;
      position: relative;
      padding: 0 13px;
      i:first-child {
        margin-right: 8px;
      }
      i:last-child {
        @include position(absolute, right 15, top 12);
      }
      &:hover {
        @include color(#22282e, #fff);
      }
    }
  }
}
</style>