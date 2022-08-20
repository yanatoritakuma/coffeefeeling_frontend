import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    queryClient.removeQueries(["coffees"]);
    queryClient.removeQueries(["user"]);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push("/");
  };

  return { logout };
};
