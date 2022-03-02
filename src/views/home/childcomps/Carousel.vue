<template>
  <div class="carousel">
    <el-carousel height='170px'>
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {ElCarousel, ElCarouselItem} from 'element-plus'
export default {
  name: 'Carousel',
  components: {
    ElCarousel,
    ElCarouselItem
  },
  props: {
    banner: {
      type: Array
    }
  },
  data() {
    return {
      //保证事件只发生一次
      isLoad: false
    }
  },
  methods: {
    imgLoad() {
      if(!this.isLoad) {
        this.$emit('imgLoad')
        this.isLoad = true
      }
    }
  },
}
</script>

<style scoped>
.el-carousel /deep/ .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 3px;
}
.el-carousel img {
  width: 100%;
}
</style>