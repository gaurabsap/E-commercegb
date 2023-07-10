import { configureStore } from "@reduxjs/toolkit";
import cart from './CartSlice'
import finalcarts from './cartFinal'
import status from './reducer/UserStatus'

const store = configureStore({
    reducer: {
        allCarts: cart,
        finalcart: finalcarts,
        userStatus: status
    }
})


export default store