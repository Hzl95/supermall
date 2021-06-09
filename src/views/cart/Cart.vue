<template>
  <div class="cart">
    <!-- 导航 -->
  <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
  <!-- 商品列表 -->
  <cart-list/>
  <!-- 底部汇总 -->
  <cart-list-bottom/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartListBottom from './childComps/CartListBottom.vue'

import {mapGetters} from 'vuex'



export default {
  components:{
    NavBar,
    CartList,
    CartListBottom
  },
  computed:{
    //1.第一种 数组的方法
    // ...mapGetters(['cartLength','cartList'])
    //2.第二种 对象的方法
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>

<style>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .cart{
    height: 100vh;
    position: relative;
  }
</style>