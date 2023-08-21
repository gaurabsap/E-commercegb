import { createSlice } from "@reduxjs/toolkit";

const cartFinalSlice = createSlice({
  name: "cartFinal",

  initialState: {
    cartData: [],
  },
  reducers: {
    setCartData(state, action) {
      // console.log(action.payload.itemsId)
      const { itemId, quantity } = action.payload;
      console.log(itemId);
      if (quantity > 1) {
        // console.log(itemId)
        // console.log(JSON.parse(JSON.stringify(state.cartData[0].itemId._id)))

        const itemIndex = state.cartData.findIndex(
          (item) => item.itemId?._id === itemId
        );
        console.log(itemIndex);
        state.cartData[itemIndex].quantity = quantity;
      } else {
        state.cartData.push(action.payload);
      }
    },
    setcartRemove(state, action) {
      console.log(action.payload.itemId);
      state.cartData = state.cartData.filter(
        (item) => item.itemId._id !== action.payload.itemId
      );
    },
  },
});

export const { setCartData, setcartRemove } = cartFinalSlice.actions;

export default cartFinalSlice.reducer;
