const state = {
  isOpen: true
}

const getters = {
  getNavStatus: state => state.isOpen
}

const mutations = {
  toggleNavStatus(state) {
    state.isOpen = !state.isOpen;
  }
}

export default {
  state,
  getters,
  mutations
}
