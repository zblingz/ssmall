<template>
  <scroll id="tab-menu" :pullUpLoad='true'>
    <div class="menu-list">
      <div class="menu-list-item"
         v-for="(item, index) in categories"
          :key="index"
          :class="{active: currentIndex === index}"
          @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'TabMenu',
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('selectItem', index)
    }
  },
}
</script>

<style scoped>
  #tab-menu {
    width: 100px;
    height: 100%;
    background-color: #f6f6f6;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    text-align: center;
    font-size: 14px;
    line-height: 45px;
  }

  .menu-list-item.active {
    background-color: #fff;
    color: var(--color-high-text);
    border-left: 3px solid var(--color-high-text);
    font-weight: 700
  }
</style>