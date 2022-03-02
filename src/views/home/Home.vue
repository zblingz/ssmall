<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control 
        ref="tabControl1"
        @tabClick='tabClick'
        :title="['流行', '新款', '精选']"
        v-show="isTabFixed"/>
    <scroll
          class="content"
          ref="scroll" 
          :probeType='3' 
          @scroll='contentScroll'
          :pullUpLoad='true'
          @pullingUp='loadMore'>
      <carousel :banner='banner' @imgLoad='imgLoad'/>
      <recommend-view :recommends='recommends'/>
      <feature-view/>
      <tab-control 
          ref="tabControl2"
          @tabClick='tabClick'
          :title="['流行', '新款', '精选']"/>
      <goods-list :goods='showImage'/>
    </scroll>
 
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata, getHomeGoods} from 'network/home'

import RecommendView from 'views/home/childcomps/RecommendView.vue'
import Carousel from 'views/home/childcomps/Carousel'
import FeatureView from 'views/home/childcomps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import BackTop from 'components/content/backTop/BackTop'

import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'Home',
  components: {
    NavBar,
    RecommendView,
    Carousel,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banner: [],
      recommends: [],
      goods: {
        pop : {page: 0, list: []},
        new : {page: 0, list: []},
        sell : {page: 0, list: []},
      },
      currentType: 'pop',
      isTabFixed: false,
      tabOffset: 0,
      isShowBackTop: false,
      saveY: 0
    }
  },
  computed: {
    showImage() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    //获取首页滚动的y值
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    //事件监听相关
    tabClick(index) {
      switch(index) {
        case 0: 
          this.currentType = 'pop'
          break 
        case 1: 
          this.currentType = 'new'
          break
        case 2: 
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      //backTop是否显示
      this.isShowBackTop = -position.y > 1000

      //tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffset 
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    imgLoad() {
      //获取tabControl的offsetTop
      this.tabOffset = this.$refs.tabControl2.$el.offsetTop
    },
    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        //将数据转存给result
        this.banner = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        //将请求到底数据压入list数组，同时改变page的页数
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>