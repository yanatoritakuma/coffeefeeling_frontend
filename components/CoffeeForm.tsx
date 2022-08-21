import React, { useState } from "react";
import { FormEvent } from "react";
import { TextInput, Button, Center, Select } from "@mantine/core";
import { IconDatabase } from "@tabler/icons";
import useStore from "../store";
import { useMutateCoffee } from "../hooks/useMutateCoffee";

export const CoffeeForm = () => {
  const [coffeeState, setCoffeeState] = useState({
    id: 0,
    name: "",
    image: "",
    category: "",
    bitter: 0,
    acidity: 0,
    amount: 0,
    price: 0,
    place: "",
  });

  console.log(coffeeState);

  // const { editedCoffee } = useStore();
  const update = useStore((state) => state.updateEditedCoffee);
  const { createCoffeeMutation, updateCoffeeMutation } = useMutateCoffee();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (coffeeState.id === 0) {
      createCoffeeMutation.mutate({
        name: coffeeState.name,
        image: coffeeState.image,
        category: coffeeState.category,
        bitter: coffeeState.bitter,
        acidity: coffeeState.acidity,
        amount: coffeeState.amount,
        price: coffeeState.price,
        place: coffeeState.place,
      });
    } else {
      updateCoffeeMutation.mutate({
        id: coffeeState.id,
        name: coffeeState.name,
        image: coffeeState.image,
        category: coffeeState.category,
        bitter: coffeeState.bitter,
        acidity: coffeeState.acidity,
        amount: coffeeState.amount,
        price: coffeeState.price,
        place: coffeeState.place,
      });
    }
    setCoffeeState({
      id: 0,
      name: "",
      image: "",
      category: "",
      bitter: 0,
      acidity: 0,
      amount: 0,
      price: 0,
      place: "",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="商品名"
          value={coffeeState.name}
          onChange={(e) =>
            setCoffeeState({ ...coffeeState, name: e.target.value })
          }
        />
        <TextInput
          mt="md"
          placeholder="カテゴリー"
          value={coffeeState.category}
          onChange={(e) =>
            setCoffeeState({ ...coffeeState, category: e.target.value })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          placeholder="苦さ"
          label="苦さ"
          value={String(coffeeState.bitter)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              bitter: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          placeholder="酸味"
          label="酸味"
          value={String(coffeeState.acidity)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              acidity: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["180", "350", "470", "590"]}
          placeholder="量"
          label="量"
          value={String(coffeeState.amount)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              amount: Number(e),
            })
          }
        />
        <Select
          style={{ zIndex: 2 }}
          data={["100", "300", "500", "700", "1000"]}
          placeholder="値段"
          label="値段"
          value={String(coffeeState.price)}
          onChange={(e) =>
            setCoffeeState({
              ...coffeeState,
              price: Number(e),
            })
          }
        />
        <TextInput
          mt="md"
          placeholder="場所"
          value={coffeeState.place}
          onChange={(e) =>
            setCoffeeState({ ...coffeeState, place: e.target.value })
          }
        />
        <Center mt="lg">
          <Button
            disabled={coffeeState.name === ""}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {coffeeState.id === 0 ? "Create" : "Update"}
          </Button>
        </Center>
      </form>
    </>
  );
};
