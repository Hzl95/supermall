import { ADD_COUNTER, ADD_TO_CART } from './mutations.type'

export default {
    //mutations唯一的目的就是修改state中状态  进行跟踪
    //mutations中的me每个方法尽可能完成的事情比较单一一点
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}