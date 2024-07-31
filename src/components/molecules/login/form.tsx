"use client";
import style from "../style/form.module.css";
import { login } from "@/services/AuthService";
import { TokenDTO } from "@/types/dtos/auth/Token";
import { LoginOwnerDTO } from "@/types/dtos/auth/request/LoginOwner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import Toast from "@/util/notification";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppProvider";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { setSessionToken } = useAppContext();
  const onSubmit = async (data: LoginOwnerDTO) => {
    try {
      const result: TokenDTO = await login(data);
      const getCookie = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
      if (!getCookie.ok) {
        console.log(`HTTP error! status: ${getCookie.status}`);
      }
      const payload = (await getCookie.json()) as TokenDTO;
      setSessionToken(payload.token);
      router.push("/content/category");
      router.refresh();
    } catch (error: any) {
      if (!error?.response) {
        Toast.notifyError("No Server Response");
      } else if (error.response?.status === 400) {
        Toast.notifyError("Missing Username or Password");
      } else if (error.response?.status === 401) {
        Toast.notifyError("Unauthorized");
      } else {
        Toast.notifyError("Login Failed");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit as any)}
        className={style.container}
      >
        <label htmlFor="email" className={style.label}>
          Phone Number
        </label>
        <input
          className={style.email}
          placeholder="xxxx-xxx-xxx"
          type="account"
          id="account"
          {...register("account")}
          required
        />
        <label htmlFor="password" className={style.label}>
          Password
        </label>
        <input
          className={style.email}
          placeholder="Enter at least 8+ character"
          type="password"
          id="password"
          {...register("password")}
          required
        />
        <div className={style.align}>
          <div className={style.remember}>
            <input type="checkbox"/> Remember me
          </div>
          <div className={style.forgot}>
            <button>Forgot password?</button>
          </div>
        </div>
        <div className={style.wrapper}>
          <button type="submit" className={style.signIn}>
            Sign in{" "}
          </button>
          <h2 className={style.or}>Or sign in with</h2>
          <button className={style.social1}>
            <FontAwesomeIcon icon={faGoogle} className={style.icon} />
          </button>
          <button className={style.social2}>
            <FontAwesomeIcon icon={faFacebook} className={style.icon} />
          </button>
          <button className={style.social3}>
            <FontAwesomeIcon icon={faApple} className={style.icon} />
          </button>
          <div className={style.parent}>
            <h1 className={style.accountText}>Dont have an account?</h1>

            <button className={style.signUp}>Sign up</button>
          </div>
        </div>
      </form>
    </div>
  );
}
