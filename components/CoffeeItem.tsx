import { FC } from "react";
import { List } from "@mantine/core";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Coffee } from "@prisma/client";
import useStore from "../store";
import { useMutateCoffee } from "../hooks/useMutateCoffee";

export const CoffeeItem: FC<
  Omit<Coffee, "createdAt" | "updatedAt" | "userId">
> = ({ id, name, image, category, bitter, acidity, amount, price, place }) => {
  const update = useStore((state) => state.updateEditedCoffee);
  const { deleteCoffeeMutation } = useMutateCoffee();
  return (
    <List.Item>
      <div className="float-left mr-10">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              name,
              image,
              category,
              bitter,
              acidity,
              amount,
              price,
              place,
            });
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteCoffeeMutation.mutate(id);
          }}
        />
      </div>
      <span>{name}</span>
    </List.Item>
  );
};
