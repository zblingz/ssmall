<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
      observeImage: {
        debounceTime: 100,
      },
    })

    //监听滚动的位置
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })

    //监听上拉加载
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      // this.scroll.finishPullUp()
    })
  },
  methods: {
    scrollTo(x, y, time=300) {
     this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>