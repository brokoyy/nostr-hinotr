import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nip19 } from "nostr-tools";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pubkey = params.get("pubkey") || params.get("npub") || params.get("nprofile");

    const resolvePubkey = (v: string): string | null => {
      // nsec.app が pubkey 直接、npub、nprofile のいずれかを返しても扱えるように
      if (!v) return null;
      if (/^[0-9a-f]{64}$/i.test(v)) return v; // raw hex pubkey
      try {
        const decoded = nip19.decode(v);
        if (decoded.type === "npub" && typeof decoded.data === "string") return decoded.data;
        if (decoded.type === "nprofile" && typeof decoded.data === "object" && decoded.data.pubkey) return decoded.data.pubkey;
      } catch {}
      return null;
    };

    const pk = pubkey ? resolvePubkey(pubkey) : null;

    if (pk) {
      localStorage.setItem("pubkey", pk);
      navigate("/");
    } else {
      alert("nsec.app 認証に失敗しました");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <div>認証処理中...</div>;
}
