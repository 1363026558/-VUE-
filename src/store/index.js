import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    setStorage(state, payload) {
      window.localStorage.setItem(payload.key, JSON.stringify(payload.value));
    },
    delStorage(state, payload) {
      window.localStorage.removeItem(payload.key);
    },
    changeLoading(state) {
      this.state.loading = !this.state.loading;
    }
  },
  actions: {
  },
  modules: {
  }
})
