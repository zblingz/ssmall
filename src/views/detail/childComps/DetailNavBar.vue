<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <img src="~assets/img/common/back.svg" 
          alt="" class="back"
          @click="backClick">
      </template>
      <template v-slot:center >
          <span class="center" 
              v-for="(item, index) in titles" 
              :key="index" 
              @click="titleClick(index)"
              :class="{active: currentIndex === index}">{{item}}</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    }
  },
}
</script>

<style scoped>
.back {
  margin-left: -13px;
  margin-top: 10px;
}

.center {
  font-size: 13px;
  padding: 7px;
}

.active {
  color: var(--color-high-text);
}
</style>