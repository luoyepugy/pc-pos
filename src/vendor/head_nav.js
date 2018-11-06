import { mapMutations, mapState } from 'vuex';
import ChildrenNav from './child_nav.js';

export default {
  template: `<div class="cp-head-nav">
    <div class="logo" :class="[isOpen ? '': 'mini']">
      <p v-show="isOpen">TOPSPORTS</p>
      <p v-show="isOpen">滔搏运动城</p>
      <p v-show="!isOpen">滔搏</p>
    </div>
    <div class="title">
      <div class="ios-menu" @click="toggle">
        <Icon type="ios-menu" size="24" />
      </div>运营管理系统
    </div>
    <div class="menu">
      <ul>
        <li @mouseover="show.base=true" @mouseout="show.base=false">主数据
          <ChildrenNav :is-left-nav="false" :multi="true" :show="show.base" :list="childMenu.base"></ChildrenNav>
        </li>
        <li @mouseover="show.user=true" @mouseout="show.user=false">
          <Icon type="ios-person-outline" size="24" />用户名
          <ChildrenNav :is-left-nav="false" :multi="false" :show="show.user" :list="childMenu.user"></ChildrenNav>
        </li>
        <li @mouseover="show.setting=true" @mouseout="show.setting=false">
          <Icon type="ios-settings-outline" size="24" />
          <ChildrenNav :is-left-nav="false" :multi="false" :show="show.setting" :list="childMenu.setting"></ChildrenNav>
        </li>
        <li>
          <Badge :count="3" overflow-count="99">
            <Icon type="ios-notifications-outline" size="26"></Icon>
          </Badge>
        </li>
      </ul>
    </div>
  </div>`,
  data() {
    return {
      show: {
        setting: false,
        user: false,
        base: false,
      },
      childMenu: {
        setting: [{
            name: '应用管理',
            route: 'system-app',
            icon: 'ios-document-outline'
          },
          {
            name: '菜单管理',
            route: 'system-menu',
            icon: 'ios-document-outline'
          },
          {
            name: '模块管理',
            route: 'system-module',
            icon: 'ios-document-outline'
          },
          {
            name: '角色权限',
            route: 'system-role',
            icon: 'ios-document-outline'
          },
          {
            name: '用户管理',
            route: 'system-module',
            icon: 'ios-document-outline'
          },
          {
            name: '用户组管理',
            route: 'system-module',
            icon: 'ios-document-outline'
          },
          {
            name: '数据管理',
            route: 'system-module',
            icon: 'ios-document-outline'
          },
          {
            name: '操作权限管理',
            route: 'system-module',
            icon: 'ios-document-outline'
          },
          {
            name: '操作日志',
            route: 'system-module',
            icon: 'ios-document-outline'
          },
        ],
        user: [{
            name: '账号信息',
            route: 'system-module',
            icon: 'ios-document-outline'
          },
          {
            name: '退出系统',
            route: 'system-module',
            icon: 'ios-document-outline'
          }
        ],
        base: [{
          name: '组织架构',
          icon: 'ios-document-outline',
          width: '160px',
          children: [{
              name: '行政区域',
              route: 'system-module'
            }, {
              name: '地区管理',
              route: 'system-module'
            },
            {
              name: '组织机构管理',
              route: 'system-module'
            }, {
              name: '片区管理',
              route: 'system-module'
            }
          ]
        }, {
          name: '主档资料',
          icon: 'ios-document-outline',
          children: [{
              name: '卖场管理',
              route: 'system-module'
            }, {
              name: '铺位组管理',
              route: 'system-module'
            },
            {
              name: '专柜管理',
              route: 'system-module'
            }, {
              name: '销售码管理',
              route: 'system-module'
            }
          ]
        }, {
          name: '辅助资料',
          icon: 'ios-document-outline',
          width: '170px',
          children: [{
              name: '结算公司管理',
              route: 'system-module'
            }, {
              name: '供应商管理',
              route: 'system-module'
            },
            {
              name: '品牌管理',
              route: 'system-module'
            }, {
              name: '客户管理',
              route: 'system-module'
            }, {
              name: '商业集团',
              route: 'system-module'
            }, {
              name: '商业维护',
              route: 'system-module'
            },
            {
              name: '商圈管理',
              route: 'system-module'
            }, {
              name: '销售码类别管理',
              route: 'system-module'
            }, {
              name: '数据字典管理',
              route: 'system-module'
            }, {
              name: '物业公司管理',
              route: 'system-module'
            }
          ]
        }, {
          name: '财务资料',
          width: '200px',
          icon: 'ios-document-outline',
          children: [{
              name: '支付方式管理',
              route: 'system-module'
            }, {
              name: '总账类别',
              route: 'system-module'
            },
            {
              name: '专柜管理',
              route: 'system-module'
            }, {
              name: '销售码管理',
              route: 'system-module'
            },
            {
              name: '扣费类别',
              route: 'system-module'
            }, {
              name: '扣费费用',
              route: 'system-module'
            }, {
              name: '扣费费用支付方式配置',
              route: 'system-module'
            }
          ]
        }],
      },
    }
  },
  components: {
    ChildrenNav,
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    isOpen: state => state.nav.isOpen,

  }),
  methods: {
    ...mapMutations({
      toggle: 'toggleNavStatus'
    })
  }
};