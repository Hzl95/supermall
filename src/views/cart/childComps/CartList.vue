<template>
      <scroll class="content" ref="scroll">
          <cart-list-item :key="index" v-for="(item,index) in cartList" :item="item"/>
      </scroll>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

export default {
    components: { 
        Scroll,
        CartListItem 
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated(){
        this.$refs.scroll.refresh()
    }

}
</script>

<style scoped>
    .content{
        position: absolute;
        overflow: hidden;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 49px;
    }
</style>