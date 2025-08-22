import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pubkey = params.get("pubkey");

    if (pubkey) {
      localStorage.setItem("pubkey", pubkey);
      navigate("/"); // ホームに戻る
    } else {
      alert("nsec.app 認証に失敗しました");
      navigate("/login");
    }
  }, [navigate]);

  return <div>認証処理中...</div>;
}
