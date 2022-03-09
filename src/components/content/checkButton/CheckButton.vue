<template>
  <div class="icon-selector">
    <img src="~assets/img/cart/tick.svg" alt="" :class="{'active': checked}">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    checked: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid rgb(80, 79, 79);
    border-radius: 50%;
  }

  .active {
    background-color: rgb(194, 33, 33);
    border: rgb(194, 33, 33);
    border-radius: 50%;
  }
</style>