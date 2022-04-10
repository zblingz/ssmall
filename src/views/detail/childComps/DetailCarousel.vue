<template>
  <div class="detail-carousel">
    <el-carousel height='300px'>
      <el-carousel-item v-for="(item, index) in topImage" :key="index">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {ElCarousel, ElCarouselItem} from 'element-plus'
export default {
  name: 'DetailCarousel',
  components: {
    ElCarousel,
    ElCarouselItem
  },
  props: {
    topImage: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-carousel {
  overflow: hidden;
}

.el-carousel /deep/ .el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 2px;
}

.detail-carousel img {
  width: 100%;
}
</style>