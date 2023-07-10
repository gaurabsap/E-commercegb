import { createSlice } from '@reduxjs/toolkit';

const userStatus = createSlice({
  name: 'user',
  initialState: {
    status: false,
  },
  reducers: {
    Setstatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { Setstatus } = userStatus.actions;

export default userStatus.reducer;
