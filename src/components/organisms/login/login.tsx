import style from "../style/login.module.css";
import Image from "next/image";
import { LoginForm } from "@/components/molecules";

export default function Login() {
  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.column}>
          <div className={style.block}>
            <h1>Sign in</h1>
            <LoginForm />
          </div>
        </div>
        <div className={style.column}>
          <Image
            className={style.image}
            src="/images/image1.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", overflow: "hidden" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
