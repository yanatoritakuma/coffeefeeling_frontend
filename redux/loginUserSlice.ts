import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    image: string | null;
    admin: boolean;
    likes: number[];
  };
};

const initialState: InitialState = {
  user: {
    id: 0,
    createdAt: "",
    updatedAt: "",
    email: "",
    name: "",
    image: "",
    admin: false,
    likes: [0],
  },
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
