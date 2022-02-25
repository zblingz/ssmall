<template>
  <div class="carousel">
    <el-carousel height='170px'>
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    banner: {
      type: Array
    }
  }
}
</script>

<style scoped>
.el-carousel {
  padding-top: 44px;
}

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