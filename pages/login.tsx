import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { TextBox } from "../components/atoms/TextBox";
import { ButtonBox } from "../components/atoms/ButtonBox";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import useChangeImage from "../hooks/useChangeImage";
import imageRegistration from "../utils/imageRegistration";
import CanNotLogin from "../components/dialog/CanNotLogin";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const router = useRouter();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    name: "",
    img: null,
    admin: false,
  });

  const [questionFlag, setQuestionFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  // アップロード画像hooks
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();

  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (!photoUrl) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      const res = reader!.result;
      if (res && typeof res === "string") {
        setPreviewUrl(res);
      }
    };
    reader.readAsDataURL(photoUrl);

    return () => {
      reader = null;
    };
  }, [photoUrl]);

  const onClickLogin = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: auth.email,
        password: auth.password,
      });
      setAuth({
        email: "",
        password: "",
        name: "",
        img: null,
        admin: false,
      });
      router.push("/myPage");
    } catch (e: any) {
      setError(e.response.data.message);
      setLoading(false);
    }
  };

  const createAccount = async (file: any) => {
    setLoading(true);
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: auth.email,
          password: auth.password,
          name: auth.name,
          image: file,
          admin: auth.admin,
        });
      }
      await onClickLogin();
      router.push("/myPage");
    } catch (e: any) {
      setError(e.response.data.message);
      setLoading(false);
    }
  };

  const { onClickRegistration } = imageRegistration();

  // 登録処理
  const onClickRegister = (e: React.FormEvent<HTMLFormElement>) => {
    const ret = window.confirm("この内容で登録しますか？");

    // バリデーション
    if (auth.name === "") {
      return alert("名前は必須です。");
    }

    if (ret) {
      onClickRegistration(e, photoUrl, createAccount, setPhotoUrl, setPreviewUrl);

      setAuth({
        email: "",
        password: "",
        name: "",
        img: null,
        admin: false,
      });
    }
  };

  return (
    <section css={loginMainBox}>
      <div css={loginBox}>
        <h2>{isRegister ? "アカウント作成" : "ログイン"}</h2>
        {error && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              {error === "invalid csrf token" ? "Cookieが無効になっています。" : error}
            </Alert>
          </Stack>
        )}
        <div css={textBox}>
          <TextBox
            value={auth.email}
            onChange={(e) =>
              setAuth({
                ...auth,
                email: e.target.value,
              })
            }
            label="メールアドレス"
            fullWidth
          />
        </div>
        <div css={textBox}>
          <TextBox
            value={auth.password}
            onChange={(e) =>
              setAuth({
                ...auth,
                password: e.target.value,
              })
            }
            label="パスワード"
            type
            fullWidth
          />
        </div>

        {isRegister && (
          <>
            <div css={textBox}>
              <TextBox
                value={auth.name}
                onChange={(e) =>
                  setAuth({
                    ...auth,
                    name: e.target.value,
                  })
                }
                label="名前"
                fullWidth
              />
            </div>
            <ButtonBox upload onChange={onChangeImageHandler} />
          </>
        )}

        {previewUrl !== "" && (
          <div css={imageBox}>
            <Image src={previewUrl} alt="画像" layout="responsive" width={400} height={340} />
          </div>
        )}

        <div css={registerTextBox}>
          {isRegister ? (
            <p onClick={() => setIsRegister(false)}>アカウントをお持ちの場合はこちら</p>
          ) : (
            <p onClick={() => setIsRegister(true)}>アカウントをお持ちでない場合はこちら</p>
          )}
        </div>

        <div css={questionBox} onClick={() => setQuestionFlag(true)}>
          <span className="questionBox__icon">？</span>
          <span>ログインできない場合</span>
        </div>

        <CanNotLogin open={questionFlag} onClose={() => setQuestionFlag(false)} />

        <div css={btnBox}>
          <ButtonBox
            onClick={(e) => {
              isRegister ? onClickRegister(e) : onClickLogin();
            }}
          >
            {isRegister ? "登録" : "ログイン"}
          </ButtonBox>
        </div>
      </div>
      {loading && (
        <div className="fileter">
          <CircularProgress size="6rem" />
        </div>
      )}
    </section>
  );
};

export default Login;

const loginMainBox = css`
  background-color: #b4c5c7;
  width: 100%;
  height: 100vh;

  .fileter {
    background-color: #333;
    opacity: 0.7;
    position: fixed;
    top: 0;
    z-index: 500;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const loginBox = css`
  margin: 0 auto;
  padding: 60px 20px 20px 20px;
  width: 50%;
  min-width: 300px;
  max-width: 1200px;

  h2 {
    margin-top: 120px;
    text-align: center;
  }
`;

const textBox = css`
  margin: 20px 0;
`;

const registerTextBox = css`
  p {
    margin: 20px 0;
    display: inline-block;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const btnBox = css`
  margin: 20px 0;
  text-align: center;
  button {
    width: 80%;
  }
`;

const imageBox = css`
  margin: 0 auto;
  width: 50%;

  img {
    border-radius: 50%;
  }
`;

const questionBox = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;

  .questionBox__icon {
    margin-right: 6px;
    padding: 6px;
    background-color: #e73562;
    border-radius: 50%;
    color: #fff;
  }
`;
