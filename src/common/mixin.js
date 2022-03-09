import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    //监听回到顶部
    listenShopBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  },
}