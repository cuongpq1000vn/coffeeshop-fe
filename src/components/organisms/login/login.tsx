import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../style/login.module.css";
import Image from "next/image";
import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { LoginForm } from "@/components/molecules";

export default function Login() {
  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.column}>
          <div className={style.block}>
            <h1>Sign in</h1>
            <LoginForm />
            <div className={style.wrapper}>
              <button className={style.signIn}>Sign in </button>
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
                <h1 className={style.accountText}>Don't have an account?</h1>

                <button className={style.signUp}>Sign up</button>
              </div>
            </div>
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
