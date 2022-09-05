import { useRouter } from "next/router";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Coffee } from "@prisma/client";
import { EditedCoffee } from "../types";

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
        const previousTodos = queryClient.getQueryData<Coffee[]>(["coffees"]);
        if (previousTodos) {
          queryClient.setQueryData(["coffees"], [res, ...previousTodos]);
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
        const previousTodos = queryClient.getQueryData<Coffee[]>(["coffees"]);
        if (previousTodos) {
          queryClient.setQueryData(
            ["coffees"],
            previousTodos.map((task) => (task.id === res.id ? res : task))
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
        const previousTodos = queryClient.getQueryData<Coffee[]>(["coffees"]);
        if (previousTodos) {
          queryClient.setQueryData(
            ["coffees"],
            previousTodos.filter((task) => task.id !== variables)
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
