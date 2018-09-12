import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import nav from './modules/nav'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    nav
  }
})
