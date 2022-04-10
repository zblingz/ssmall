import BackTop from 'components/content/backTop/BackTop'
import {POP, NEW, SELL} from './const'
import {debounce} from './utils'
import emitter from 'tiny-emitter'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    //接受图片监听事件
    this.refresh = debounce(this.$refs.scroll.refresh, 100)

    //保存监听的事件
    this.itemImgListener = () => {this.refresh()}
    emitter.prototype.on('itemImageLoad', this.itemImgListener)
  },
}

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

export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = POP;
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break  
      }
    }
  }
}