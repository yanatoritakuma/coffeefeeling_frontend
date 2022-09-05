import React from "react";
import { UserInfo } from "../components/UserInfo";
import { CoffeeForm } from "../components/CoffeeForm";
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
        </>
      )}
    </section>
  );
};

export default MyPage;
