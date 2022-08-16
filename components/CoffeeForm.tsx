import { FormEvent } from "react";
import { TextInput, Button, Center } from "@mantine/core";
import { IconDatabase } from "@tabler/icons";
import useStore from "../store";
import { useMutateCoffee } from "../hooks/useMutateCoffee";

export const CoffeeForm = () => {
  const { editedCoffee } = useStore();
  const update = useStore((state) => state.updateEditedCoffee);
  const { createCoffeeMutation, updateCoffeeMutation } = useMutateCoffee();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedCoffee.id === 0) {
      createCoffeeMutation.mutate({
        name: editedCoffee.name,
        image: editedCoffee.image,
        category: editedCoffee.category,
        bitter: editedCoffee.bitter,
        acidity: editedCoffee.acidity,
        amount: editedCoffee.amount,
        price: editedCoffee.price,
        place: editedCoffee.place,
      });
    } else {
      updateCoffeeMutation.mutate({
        id: editedCoffee.id,
        name: editedCoffee.name,
        image: editedCoffee.image,
        category: editedCoffee.category,
        bitter: editedCoffee.bitter,
        acidity: editedCoffee.acidity,
        amount: editedCoffee.amount,
        price: editedCoffee.price,
        place: editedCoffee.place,
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="name"
          value={editedCoffee.name || ""}
          onChange={(e) => update({ ...editedCoffee, name: e.target.value })}
        />
        <TextInput
          mt="md"
          placeholder="category"
          value={editedCoffee.category || ""}
          onChange={(e) =>
            update({ ...editedCoffee, category: e.target.value })
          }
        />
        <TextInput
          mt="md"
          placeholder="bitter"
          value={editedCoffee.bitter || 0}
          onChange={(e) =>
            update({ ...editedCoffee, bitter: Number(e.target.value) })
          }
        />
        <Center mt="lg">
          <Button
            disabled={editedCoffee.name === ""}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {editedCoffee.id === 0 ? "Create" : "Update"}
          </Button>
        </Center>
      </form>
    </>
  );
};
