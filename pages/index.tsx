import type { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";
import { useQueryUser } from "../hooks/useQueryUser";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: user } = useQueryUser();
  const handleSubmit = async () => {
    try {
      if (!user?.id) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          email: "guests@mail.com",
          password: "guests",
        });
        router.push("/feeling");
        console.log("sin");
      } else {
        console.log("login");
        router.push("/feeling");
      }
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  };

  return (
    <section>
      <h1>CoffeFeeling</h1>
      <Button onClick={() => handleSubmit()}>今の気分で選ぶ</Button>
    </section>
  );
};

export default Home;
