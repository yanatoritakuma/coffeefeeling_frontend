import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { LogoutIcon } from "@heroicons/react/solid";
import { UserInfo } from "../components/UserInfo";
import { useQueryClient } from "@tanstack/react-query";
import { CoffeeForm } from "../components/CoffeeForm";
import { CoffeeList } from "../components/CoffeeList";
import { useQueryUser } from "../hooks/useQueryUser";

const MyPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useQueryUser();

  const logout = async () => {
    queryClient.removeQueries(["coffees"]);
    queryClient.removeQueries(["user"]);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push("/");
  };

  return (
    <section>
      MyPage
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo />
      {user?.admin && (
        <>
          <CoffeeForm />
          <CoffeeList />
        </>
      )}
    </section>
  );
};

export default MyPage;
