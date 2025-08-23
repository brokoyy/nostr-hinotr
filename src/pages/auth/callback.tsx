// Nsec.app や他の外部OAuthからのコールバック用（今回は簡易）
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Callback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // ここで URL パラメータから nsec を取得して localStorage に保存
    navigate("/");
  }, []);
  return <div>Logging in...</div>;
};
