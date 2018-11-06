import Vue from 'vue'
//=============import======
import HeaderNav from './header_nav.vue'
import ChildrenNav from './children_nav.vue'
import LeftNav from './left_nav.vue'
import Crumb from './crumb.vue'
import TableColumnFilter from './table_column_filter.vue'
import DropToSelect from './drop_select.vue'
import GridTable from './grid_table/grid_table.vue'

//============register===公共组件============
Vue.component('HeaderNav', HeaderNav)
Vue.component('ChildrenNav', ChildrenNav)
Vue.component('LeftNav', LeftNav)
Vue.component('Crumb', Crumb)
Vue.component('TableColumnFilter', TableColumnFilter)
Vue.component('DropToSelect', DropToSelect)
Vue.component('GridTable', GridTable)

export default {
  HeaderNav,
  ChildrenNav,
  LeftNav,
  Crumb,
  TableColumnFilter,
  DropToSelect,
  GridTable,
}