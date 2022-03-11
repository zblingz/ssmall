<template>
  <div class="account">
    <div class="account-item">
      <div class="number"><span class="balance">0.00</span>元</div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">0</span>个</div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">0</span>分</div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo'
}
</script>

<style scoped>
  .account {
    display: flex;
    border-bottom: 2px solid #eee;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
    border-right: 2px solid #eee;
    border-collapse: collapse;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 8px;
  }

  .account-item .balance {
    font-size: 20px;
    font-weight: 400;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }
</style>