import create from "zustand";
import { EditedCoffee } from "../types";

type State = {
  editedCoffee: EditedCoffee;
  updateEditedCoffee: (payload: EditedCoffee) => void;
  resetEditedCoffee: () => void;
};

const useStore = create<State>((set) => ({
  editedCoffee: {
    id: 0,
    name: "",
    image: "",
    category: "",
    bitter: 0,
    acidity: 0,
    amount: 0,
    price: 0,
    place: "",
  },
  updateEditedCoffee: (payload) =>
    set({
      editedCoffee: {
        id: payload.id,
        name: payload.name,
        image: payload.image,
        category: payload.category,
        bitter: payload.bitter,
        acidity: payload.acidity,
        amount: payload.amount,
        price: payload.price,
        place: payload.place,
      },
    }),
  resetEditedCoffee: () =>
    set({
      editedCoffee: {
        id: 0,
        name: "",
        image: "",
        category: "",
        bitter: 0,
        acidity: 0,
        amount: 0,
        price: 0,
        place: "",
      },
    }),
}));
export default useStore;
