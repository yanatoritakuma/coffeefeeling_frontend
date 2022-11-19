import { useRouter } from "next/router";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Coffee } from "@prisma/client";
import { EditedCoffee } from "../types/form";

export const useMutateCoffee = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createCoffeeMutation = useMutation(
    async (coffee: Omit<EditedCoffee, "id">) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/coffee`,
        coffee
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        const previousCoffees = queryClient.getQueryData<Coffee[]>(["coffees"]);
        if (previousCoffees) {
          queryClient.setQueryData(["coffees"], [res, ...previousCoffees]);
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  const updateCoffeeMutation = useMutation(
    async (coffee: EditedCoffee) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/coffee/${coffee.id}`,
        coffee
      );
      return res.data;
    },
    {
      onSuccess: (res, variables) => {
        const previousCoffees = queryClient.getQueryData<Coffee[]>([
          "userCoffees",
        ]);
        if (previousCoffees) {
          queryClient.setQueryData(
            ["userCoffees"],
            previousCoffees.map((coffee) =>
              coffee.id === res.id ? res : coffee
            )
          );
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  const deleteCoffeeMutation = useMutation(
    async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/coffee/${id}`);
    },
    {
      onSuccess: (_, variables) => {
        const previousCoffees = queryClient.getQueryData<Coffee[]>(["coffees"]);
        if (previousCoffees) {
          queryClient.setQueryData(
            ["userCoffees"],
            previousCoffees.filter((coffee) => coffee.id !== variables)
          );
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  return { createCoffeeMutation, updateCoffeeMutation, deleteCoffeeMutation };
};
