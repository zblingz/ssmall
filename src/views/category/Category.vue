<template>
  <div class="cate">
    <nav-bar class="nav">
      <template v-slot:center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem='selectItem'/>
      <scroll ref="scroll" id="tab-content" :data='[categoryData]' :pullUpLoad='true'>
        <div>
          <tab-content-category :subcategories="showSubCategory"/>
          <tab-control :title="['综合', '新品', '销量']" @tabClick='tabClick'/>
          <goods-list :goods='showCategoryDetail'/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import {tabControlMixin} from 'common/mixin.js'
import {POP, NEW, SELL} from 'common/const'
import TabMenu from './childComps/TabMenu.vue'
import Scroll from 'components/common/scroll/Scroll'
import TabContentCategory from './childComps/TabContentCategory.vue'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
export default {
  name: 'Category',
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    GoodsList
  },
  data(){
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: POP
    }
  },
  mixins: [tabControlMixin],
  computed: {
    showSubCategory() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created() {
    //请求分类数据
    this._getCategory()
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        //1.获取分类数据
        this.categories = res.data.category.list
        //2.初始化每个类别的子数据
        for(let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        //3.请求第一个分类的数据
        this._getSubCategories(0)
      })
    },
    _getSubCategories(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(NEW)
        this._getCategoryDetail(SELL)
      })
    },
    _getCategoryDetail(type) {
      //1.获取请求的miniWallKey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      //2.发送请求，获取数据
      getCategoryDetail(miniWallkey, type).then(res => {
        //3.将请求到的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    //事件响应相关方法
    selectItem(index) {
      this._getSubCategories(index)
    },
    tabClick(index) {
      switch(index) {
        case 0: 
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break    
      }
    }
  },
}
</script>

<style scoped>
  .cate {
    height: 100vh;
  }
  .nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>