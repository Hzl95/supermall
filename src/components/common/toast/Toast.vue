<template>
  <div class="toast" v-show="show">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    props:{
        message:{
            type:String,
            default:''
        },
        show:{
            type:Boolean,
            default:true
        }
    }
}
</script>
    
<style>
.toast{
        position: fixed;
        top: 50%;
        left: 50%;
        padding: 8px 10px;
        transform: translate(-50%,-50%);
        background-color: rgba(0,0,0,.7);
        color: #fff;
    }
</style>