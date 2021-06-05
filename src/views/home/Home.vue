<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMultidata,getHomeGoods} from "network/home.js"





export default {
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed(){
    console.log('home destroyed');
  },
  activated(){
    //回来时,将位置设置为原来保存的位置saveY
    // console.log('activated');
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    //离开时记录当时的Y
    // console.log('deactivated');
    this.saveY=this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted(){
    //1.监听item中图片加载完成
    const refresh=this.debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',()=>{
      
      // this.$refs.scroll.refresh()
      // console.log('....');
      //利用debounce函数返回一个新的函数，达到防抖/节流作用，最后去执行新的函数
      refresh()
    })


  },
  methods:{
    //事件监听相关的方法
    debounce(func,delay){
      let timer=null
      return function (...args){
        if(timer) clearTimeout(timer)
        timer =setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
      }
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      // console.log(position);
      //1.判断BackTop是否显示
      this.isShowBackTop=(-position.y)>1000

      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadMore(){
      // console.log('111');
      //将当前选中的版块赋值给getHomeGoods 调用
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      //获取tabControl的offsetTop
      //经过测试 只有轮播图(HomeSwiper)的加载会对offsetTop有影响
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },

    //网络请求相关的方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      // console.log(res);
      // this.result=res;
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{
      // console.log(res);
      //将请求到的list数据添加到对应type里面
      this.goods[type].list.push(...res.data.list)
      //将对应的数据页码加1
      this.goods[type].page+=1;

      //完成上拉加载更多
      this.$refs.scroll.finishPullUp()
    })
    }
  }

}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    /* 100vh -> 100%视口 */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    /* height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px; */
    
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>