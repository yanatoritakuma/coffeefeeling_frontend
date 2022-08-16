import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { LogoutIcon } from "@heroicons/react/solid";
import { Layout } from "../components/Layout";
import { UserInfo } from "../components/UserInfo";
import { useQueryClient } from "@tanstack/react-query";
import { CoffeeForm } from "../components/CoffeeForm";
import { CoffeeList } from "../components/CoffeeList";

const MyPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    queryClient.removeQueries(["coffees"]);
    queryClient.removeQueries(["user"]);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push("/");
  };

  return (
    <Layout>
      MyPage
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo />
      <CoffeeForm />
      <CoffeeList />
    </Layout>
  );
};

export default MyPage;
