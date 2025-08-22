import React from "react";
import { loginWithNip07, loginWithNsecApp } from "../api/auth";

export default function LoginButton() {
  const handleNip07Login = async () => {
    try {
      const pubkey = await loginWithNip07();
      console.log("Logged in with NIP-07:", pubkey);
      window.location.reload(); // ログイン後にタイムライン表示
    } catch (err) {
      console.error(err);
    }
  };

  const handleNsecLogin = () => {
    loginWithNsecApp(); // リダイレクトされる
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h2 className="text-xl font-bold">ログイン方法を選択してください</h2>

      <button
        onClick={handleNip07Login}
        className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        NIP-07でログイン
      </button>

      <button
        onClick={handleNsecLogin}
        className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
      >
        nsec.appでログイン
      </button>
    </div>
  );
}
