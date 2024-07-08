"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./style/login.module.css";
import Image from "next/image";
import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export default function Login() {
  async function handleSubmit() {}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div className={style.row}>
        <div className={style.column}>
          <div className={style.block}>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit} className={style.container}>
              <label htmlFor="email" className={style.label}>
                Email Address
              </label>
              <input
                className={style.email}
                placeholder="example.email@gmail.com"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={style.align}>
                <div className={style.remember}>
                  <input type="checkbox" /> Remember me
                </div>
                <div className={style.forgot}>
                  <button>Forgot password?</button>
                </div>
              </div>
            </form>

            <div className={style.wrapper}>
              <button className={style.actual}>Sign in </button>
              <div className={style.or}>Or sign in with</div>
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
                <div className={style.final}>Don't have an account?</div>
                <div className={style.final2}>
                  <button>Sign up</button>
                </div>
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
            style={{ width: "100%", height: "auto" }}
            alt="" // optional
          />
        </div>
      </div>
    </div>
  );
}
