<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper-1 :top-images="topImages"></detail-swiper-1>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params :param-info="paramInfo" ref="params"/>
      <detail-comment :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick"
              v-show="isShowBackTop" />
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper1 from './childComps/DetailSwiper1.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParams from './childComps/DetailParams.vue'
import DetailComment from './childComps/DetailComment.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import BackTop from 'components/content/backTop/BackTop.vue'
import Toast from '../../components/common/toast/Toast.vue'

import { getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import Scroll from 'components/common/scroll/Scroll.vue'






export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper1,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParams,
    DetailComment,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  data ()
     {
    return {
      iid: null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      isShowBackTop: false,
      message:'',
      show:false

    }
  },
  created () {
    //1.保存传入的iid
    // console.log(this.$route.params.iid);
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data=res.result;
      this.topImages = data.itemInfo.topImages

      //3.获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //4.创建店铺信息的对象
     this.shop=new Shop(data.shopInfo)

      //5.保存商品的详情数据
      this.detailInfo=data.detailInfo

      //6.获取参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //7.取出评论信息
      if(data.rate.cRate !==0){
        this.commentInfo=data.rate.list[0]
      }

      //给getThemeTopY赋值
      this.getThemeTopY=this.debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      },200)
    })
     

     //请求推荐数据
     getRecommend().then(res=>{
      //  console.log(res);
       this.recommends=res.data.list
     })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index);
      //点击标题去到对应位置
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      // console.log(position);
      //1.获取y值
      const positionY=-position.y
      //2.positionY和主题中进行对比
      if(positionY>=this.themeTopYs[3]){
        this.currentIndex=3
      }else if(positionY>=this.themeTopYs[2]){
        this.currentIndex=2
      }else if(positionY>=this.themeTopYs[1]){
        this.currentIndex=1
      }else{
        this.currentIndex=0
      }
      this.$refs.nav.currentIndex=this.currentIndex
      // console.log(this.themeTopYs[3]);
      // console.log(positionY);
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart(){
      //1.获取购物车需要展示的信息
      // console.log(this.goods);
      const product={}
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;

      //2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res=>{
        // console.log(res);
        this.show=true;
        this.message=res;
        setTimeout(()=>{
          this.show=false;
          this.message='';
        },1500)
      })
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    debounce (func, delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 2.09rem;
    left: 0;
    right: 0;
  }
</style>