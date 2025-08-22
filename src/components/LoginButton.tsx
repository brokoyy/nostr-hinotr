import { loginWithNip07, loginWithNsecApp } from "../api/auth";

export default function LoginButton() {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h2 className="text-xl font-bold">ログイン方法を選択してください</h2>
      <button
        onClick={loginWithNip07}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        NIP-07でログイン
      </button>
      <button
        onClick={loginWithNsecApp}
        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
      >
        nsec.appでログイン
      </button>
    </div>
  );
}
