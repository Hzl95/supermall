<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        //ref如果是绑定在组件上，那么通过this.$refs.refname获取的是一个组件对象
        //ref如果是绑定在元素上，那么通过this.$refs.refname获取的是一个元素对象
        //1.创建BScroll对象
        this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })

        //2.监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            // console.log(position);
            this.$emit('scroll',position)
        })

        //3.监听上拉事件
        this.scroll.on('pullingUp',()=>{
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
        })
    },
    methods:{
        scrollTo(x,y,time=500){
            this.scroll&&this.scroll.scrollTo(x,y,time)
        },
        refresh(){
            // console.log('...');
            this.scroll&&this.scroll.refresh()
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        getScrollY(){
            return this.scroll?this.scroll.y:0
        }
    }
}
</script>

<style>

</style>