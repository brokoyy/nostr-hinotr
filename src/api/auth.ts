// NIP-07拡張でログイン
export async function loginWithNip07(): Promise<string> {
  if (!window.nostr) {
    alert("NIP-07対応拡張機能が必要です");
    throw new Error("No NIP-07 extension found");
  }

  const pubkey = await window.nostr.getPublicKey();
  localStorage.setItem("pubkey", pubkey);
  console.log("Logged in with NIP-07:", pubkey);
  return pubkey;
}

// nsec.app でログイン
export function loginWithNsecApp(): void {
  try {
    // 本番環境 URL に合わせて callback を指定
    const redirectUri = `${window.location.origin}/callback`;
    const url = `https://nsec.app/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = url; // nsec.app へリダイレクト
  } catch (err) {
    console.error("nsec.app login error:", err);
    alert("nsec.app ログインに失敗しました");
  }
}
