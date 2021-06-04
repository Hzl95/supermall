<template>
  <div class="goods">
      <goods-list-item :key="item.id" v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  components: { GoodsListItem },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.goods{
    display: flex;
    /* flex-wrap 属性用于指定弹性盒子的子元素换行方式
    flex-wrap：wrap ；
    弹性容器为多行。该情况下弹性子项溢出的部分会被放置到新行，子项内部会发生断行
    */
    flex-wrap: wrap;
    /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 */
    justify-content: space-around;
    padding: 2px;
}

</style>