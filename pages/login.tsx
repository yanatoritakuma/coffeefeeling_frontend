import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "yup";
import { IconDatabase } from "@tabler/icons";
import { ShieldCheckIcon } from "@heroicons/react/solid";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
  Checkbox,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { AuthForm } from "../types";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("No email provided"),
  password: Yup.string()
    .required("No password provided")
    .min(5, "Password should be min 5 chars"),
});

const Login = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
      name: "",
      admin: false,
    },
  });

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: form.values.email,
          password: form.values.password,
          name: form.values.name,
          admin: form.values.admin,
        });
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: form.values.email,
        password: form.values.password,
      });
      form.reset();
      router.push("/myPage");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return (
    <section>
      <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
      {error && (
        <Alert
          my="md"
          variant="filled"
          icon={<ExclamationCircleIcon />}
          title="Authorization Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt="md"
          id="email"
          label="メールアドレス"
          placeholder="example@gmail.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          mt="md"
          id="password"
          placeholder="パスワード"
          label="パスワード"
          description="Must be min 5 char"
          {...form.getInputProps("password")}
        />
        {isRegister && (
          <>
            <TextInput
              mt="md"
              id="name"
              label="名前"
              placeholder="山田太郎"
              {...form.getInputProps("name")}
            />

            {/* <Checkbox
              label="管理者"
              tabIndex={-1}
              size="md"
              mr="xl"
              styles={{ input: { cursor: "pointer" } }}
              {...form.getInputProps("admin")}
            /> */}
          </>
        )}

        <Group mt="xl" position="apart">
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister
              ? "Have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </Group>
      </form>
    </section>
  );
};

export default Login;

const loginBox = css`
  background-color: skyblue;
`;
