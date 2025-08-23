import { useState } from "react";
import { loginWithNip07, loginWithNsecApp, logout } from "../api/auth";


export default function LoginControl({ onLogin, onLogout, pubkey }: { onLogin: (pk: string) => void; onLogout: () => void; pubkey: string | null; }) {
const [loading, setLoading] = useState(false);


const handleNip07 = async () => {
setLoading(true);
const pk = await loginWithNip07();
if (pk) onLogin(pk);
setLoading(false);
};


const handleNsec = async () => {
setLoading(true);
const pk = await loginWithNsecApp();
if (pk) onLogin(pk);
setLoading(false);
};


return (
<div className="flex gap-2">
{pubkey ? (
<button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded">
ログアウト
</button>
) : (
<>
<button onClick={handleNip07} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
NIP-07 ログイン
</button>
<button onClick={handleNsec} disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded">
nsec.app ログイン
</button>
</>
)}
</div>
);
}
