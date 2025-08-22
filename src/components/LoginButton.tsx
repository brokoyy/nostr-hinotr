import { useState } from "react";
import { loginWithNip07, loginWithNsecApp } from "../api/auth";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const handleNip07Login = async () => {
    setLoading(true);
    try {
      const pubkey = await loginWithNip07();
      localStorage.setItem("pubkey", pubkey);
      alert("ログイン成功！ pubkey: " + pubkey);
      // 必要に応じてリダイレクト
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("NIP-07でのログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleNsecAppLogin = async () => {
    setLoading(true);
    try {
      await loginWithNsecApp();
      // nsec.app はリダイレクトされるのでここには戻らない想定
    } catch (err) {
      console.error(err);
      alert("nsec.appでのログインに失敗しました");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h2 className="text-xl font-bold">ログイン方法を選択してください</h2>

      <button
        onClick={handleNip07Login}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "ログイン中..." : "NIP-07でログイン"}
      </button>

      <button
        onClick={handleNsecAppLogin}
        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        disabled={loading}
      >
        {loading ? "リダイレクト中..." : "nsec.appでログイン"}
      </button>
    </div>
  );
}
