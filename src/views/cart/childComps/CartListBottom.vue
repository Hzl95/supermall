<template>
  <div id="cart_total">
    <div style="display: flex;">
      <cart-check-button :is-checked="isSelectAll" @click.native="checkClick"/>全选
    </div>
    <div class="calc">总计：￥{{ totalPrice }}</div>
    <div class="buy">去购买({{checkLength}})</div>
  </div>
</template>

<script>
import CartCheckButton from "./CartCheckButton.vue";
export default {
    components:{
        CartCheckButton
    },
    computed:{
        totalPrice(){
            return this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue+item.price*item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item=>item.checked).length
        },
        isSelectAll(){
            if(this.$store.state.cartList.length===0) return false
            return !this.$store.state.cartList.find(item=>!item.checked)
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){  //全选中
                this.$store.state.cartList.forEach(item=>item.checked=false)
            }else{ //部分或全部不选中
                this.$store.state.cartList.forEach(item=>item.checked=true)
            }
        }
    }
}
</script>

<style>
#cart_total {
  font-size: 0.7rem;
  height: 1.9rem;
  display: flex;
  background-color: rgb(228, 228, 228);
  line-height: 1.9rem;
  text-align: center;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
}

.calc {
  flex: 1;
}
.buy {
  width: 5rem;
  background-color: #f03;
  color: white;
}
</style>