<template>
  <div class="detail">
    <detail-nav-bar @titleClick='titleClick' ref="nav"/>
    <scroll class="content" ref="scroll" :pullUpLoad='true' @scroll='contentScroll' :probe-type='3'>
      <detail-carousel :topImage='topImage'/>  
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad='imgLoad'/>
      <detail-param-info  ref='params' :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/> 
      <goods-list ref="recommends" :goods='recommends'/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart='addToCart'/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailCarousel from './childComps/DetailCarousel.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import {debounce} from 'common/utils'
import {backTopMixin} from 'common/mixin'
import {mapActions} from 'vuex'

import DetailBottomBar from './childComps/DetailBottomBar.vue'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailCarousel,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      itemInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //监听backTop回到顶部
      this.listenShopBackTop(position)
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImage[0]
      product.title = this.goods.title
      product.price = this.goods.realPrice
      product.desc = this.itemInfo.desc
      product.iid = this.iid

      //将商品添加到购物车里
      // this.$store.dispatch('addCart', product).then(res => console.log(res))
      this.addCart(product).then(res => {
        this.$toast.show(res, 2000)
      })
    }
  },
  created() {
    this.iid = this.$route.params.iid
    //请求详情页轮播图数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      this.topImage = data.itemInfo.topImages

      this.itemInfo = data.itemInfo

      //请求商品数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //请求商家数据
      this.shop = new Shop(data.shopInfo)

      //保存商品详情数据
      this.detailInfo = data.detailInfo

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //请求评论数据
      if(data.rate.list) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //获取商品推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //给getThemeTop赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    }, 200)
  },
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>