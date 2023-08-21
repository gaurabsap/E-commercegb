import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
  card: [
    // localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  ],
  // quantity: {}
};

const CartSlide = createSlice({
  name: "card",
  initialState,
  reducers: {
    cartAdd(state, action) {
      if (state.card.includes(action.payload)) {
        console.log("xa");
      }
      state.card.push(action.payload);
      // state.card.quantity = action.payload.quantity
      localStorage.setItem("cart", JSON.stringify(state.card));
    },
    // setQuantity: (state, action) => {
    //     const { itemId, quantity } = action.payload;
    //     state.quantity[itemId] = quantity;
    //   },
    cartRemove(state, action) {
      state.card = state.card.filter((item) => item._id !== action.payload);
      // console.log(state.card)

      localStorage.setItem("cart", JSON.stringify(state.card));
    },
  },
});

export const { cartAdd, cartRemove } = CartSlide.actions;

export default CartSlide.reducer;
