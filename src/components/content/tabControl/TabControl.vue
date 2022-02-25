<template>
  <div class="tab-control">
    <div class="tab-control-item"
     v-for="(item, index) in title"
      :key="index"
      :class="{active: index===currentIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      title: ['流行', '新款', '精选'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  },
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    position: sticky;
    top: 43px;
  }

  .tab-control-item {
    flex: 1;
  }


  .active span {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
    padding-bottom: 3px;
  }
</style>