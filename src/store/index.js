import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  cartList: []
}
export default createStore({
  state,
  mutations,
  actions,
  getters
})