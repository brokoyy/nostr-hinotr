import React, { useState } from "react";
import { loginWithNIP07, loginWithNsecApp, logout } from "../api/auth";

export const LoginControl = ({ onLogin }: { onLogin: (auth: any) => void }) => {
  const [auth, setAuth] = useState<any>(null);

  const handleNIP07 = async () => {
    const res = await loginWithNIP07();
    setAuth(res);
    localStorage.setItem("nostrAuth", JSON.stringify(res));
    onLogin(res);
  };

  const handleNsec = async () => {
    const nsec = prompt("Enter your nsec:");
    if (!nsec) return;
    const res = await loginWithNsecApp(nsec);
    setAuth(res);
    localStorage.setItem("nostrAuth", JSON.stringify(res));
    onLogin(res);
  };

  const handleLogout = () => {
    logout();
    setAuth(null);
    onLogin(null);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {auth ? (
        <>
          <span>{auth.pubkey}</span>
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button onClick={handleNIP07}>Login with NIP-07</button>
          <button onClick={handleNsec} style={{ marginLeft: 10 }}>
            Login with nsec.app
          </button>
        </>
      )}
    </div>
  );
};
