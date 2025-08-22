import React from "react";
import { loginWithNip07 } from "../api/auth";

interface Props {
  onLogin: (pubkey: string) => void;
}

export const LoginButton: React.FC<Props> = ({ onLogin }) => {
  const handleLogin = async () => {
    try {
      const pubkey = await loginWithNip07();
      onLogin(pubkey);
    } catch (e) {
      console.error(e);
    }
  };

  return <button onClick={handleLogin}>Login with Nostr</button>;
};
