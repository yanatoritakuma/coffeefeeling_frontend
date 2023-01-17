import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  coffeeId: number | null;
};

const initialState: InitialState = {
  coffeeId: null,
};

export const clickLikeSlice = createSlice({
  name: "clickLike",
  initialState,
  reducers: {
    setLikeId: (state, action) => {
      state.coffeeId = action.payload;
    },
  },
});

export const { setLikeId } = clickLikeSlice.actions;

export default clickLikeSlice.reducer;
