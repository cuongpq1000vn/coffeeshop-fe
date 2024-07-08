"use client";
import { useState } from "react";
import style from "../style/form.module.css";
export default function LoginForm() {
  async function handleSubmit() {
    console.log("hit");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
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
  );
}
