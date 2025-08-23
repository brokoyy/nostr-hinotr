import React, { useState } from "react";
import { loginWithNIP07, loginWithNsecApp, logout } from "../api/auth";

export const LoginControl = ({ onLogin }: { onLogin: (pubkey: string) => void }) => {
  const [pubkey, setPubkey] = useState<string | null>(null);

  const handleNIP07 = async () => {
    const res = await loginWithNIP07();
    setPubkey(res.pubkey);
    localStorage.setItem("nostrAuth", JSON.stringify(res));
    onLogin(res.pubkey);
  };

  const handleNsec = async () => {
    const nsec = prompt("Enter your nsec:");
    if (!nsec) return;
    const res = await loginWithNsecApp(nsec);
    setPubkey(res.pubkey);
    localStorage.setItem("nostrAuth", JSON.stringify(res));
    onLogin(res.pubkey);
  };

  const handleLogout = () => {
    logout();
    setPubkey(null);
    onLogin("");
  };

  return (
    <div>
      {pubkey ? (
        <>
          <span>{pubkey}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={handleNIP07}>Login with NIP-07</button>
          <button onClick={handleNsec}>Login with nsec.app</button>
        </>
      )}
    </div>
  );
};
