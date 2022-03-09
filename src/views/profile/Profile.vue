<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        我的档案
      </template>
    </nav-bar>
    <user-info/>
    <account-info/>
    <normal-list-view :listData='orderList'/>
    <normal-list-view :listData='serviceList'/>
  </div>
</template>

<script>
import UserInfo from './childComps/UserInfo.vue'
import AccountInfo from './childComps/AccountInfo.vue'
import NormalListView from './childComps/NormalListView.vue';
export default {
  name: 'Profile',
  components: {
    UserInfo,
    AccountInfo,
    NormalListView
  },
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" },
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" },
      ],
    };
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>