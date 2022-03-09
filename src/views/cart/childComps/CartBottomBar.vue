<template>
  <div class="bottom-bar">
    <div class="allCheck">
      <check-button 
        class="check-button" 
        :checked='isSelectAll'
        @click='checkClick'/>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算: {{cartLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => item.checked).
      reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    cartLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false

      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  },
}
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #eee;
    bottom: 49px;
  }

  .allCheck {
    display: flex;
    align-items: center;
    line-height: 40px;
    width: 90px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .totalPrice {
    width: 160px;
    line-height: 40px;
    margin-left: 10px;
  }

  .calculate {
    width: 120px;
    line-height: 40px;
    background-color: skyblue;
    color: #fff;
    padding-left: 5px;
  }
</style>