import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  editCoffee: {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    category: string;
    image: string | null;
    bitter: number;
    acidity: number;
    price: number;
    place: string;
  };
  updateFlag: boolean;
};

const initialState: InitialState = {
  editCoffee: {
    id: 0,
    userId: 0,
    createdAt: "",
    updatedAt: "",
    name: "",
    category: "",
    image: null,
    bitter: 0,
    acidity: 0,
    price: 0,
    place: "",
  },
  updateFlag: false,
};

export const editCoffeeSlice = createSlice({
  name: "editCoffee",
  initialState,
  reducers: {
    setEditCoffee: (state, action) => {
      state.editCoffee = action.payload;
    },
    setUpdateFlag: (state, action) => {
      state.updateFlag = action.payload;
    },
  },
});

export const { setEditCoffee, setUpdateFlag } = editCoffeeSlice.actions;

export default editCoffeeSlice.reducer;
