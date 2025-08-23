import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // OAuth などのコールバック処理が必要な場合ここに追加
    navigate("/");
  }, []);

  return <div>Logging in...</div>;
};
