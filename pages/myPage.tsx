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
  const { data: user } = useQueryUser();

  return (
    <section>
      MyPage
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
