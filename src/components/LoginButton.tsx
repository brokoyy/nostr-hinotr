import React from "react";
import { loginWithNip07, loginWithNsecApp } from "../api/auth";

export default function Login() {
  return (
    <div>
      <button onClick={loginWithNip07}>NIP-07でログイン</button>
      <button onClick={loginWithNsecApp}>nsec.appでログイン</button>
    </div>
  );
}
