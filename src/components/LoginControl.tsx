import React from "react";
import { loginWithNip07, loginWithNsecApp } from "../api/auth";

interface Props {
  pubkey: string | null;
  onLogout: () => void;
}

export default function LoginControl({ pubkey, onLogout }: Props) {
  const handleNip07Login = async () => {
    try {
      await loginWithNip07();
      // ここで状態管理に寄せてもよいが、簡易的にリロード
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  const handleNsecLogin = () => {
    loginWithNsecApp();
  };

  if (pubkey) {
    return (
      <div className="flex flex-col items-center gap-4 mt-10">
        <h2 className="text-lg font-semibold break-all">ログイン中: {pubkey}</h2>
        <button
          onClick={onLogout}
          className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          ログアウト
        </button>
      </div>
    );
  }

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
