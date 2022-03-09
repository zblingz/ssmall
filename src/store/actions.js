import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  addCart({commit, state}, payLoad) {
    return new Promise((resolve, reject) => {
      //payLoad 新添加的商品
      //查找之前的商品中是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payLoad.iid)
      //判断oldProduct
      if(oldProduct) {
        commit(ADD_COUNTER, oldProduct)
        resolve('当前商品的数量+1')
      }else {
        payLoad.count = 1
        commit(ADD_TO_CART, payLoad)
        resolve('成功加入购物车')
      }
    })
  }
}