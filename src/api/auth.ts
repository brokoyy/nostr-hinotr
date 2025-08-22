// NIP-07拡張でログイン
export async function loginWithNip07(): Promise<string> {
  if (!window.nostr) {
    alert("NIP-07対応拡張機能が必要です");
    throw new Error("No NIP-07 extension found");
  }

  const pubkey = await window.nostr.getPublicKey();
  console.log("Logged in with pubkey:", pubkey);
  return pubkey;
}

// nsec.app でログイン
export async function loginWithNsecApp(): Promise<string> {
  try {
    // nsec.app では、ユーザーがログイン用リンクを開き、成功すると
    // リダイレクトURLに pubkey が返される仕組みを使います。
    // （以下は例： https://nsec.app/login?redirect_uri=... ）
    const redirectUri = `${window.location.origin}/auth/callback`;
    const url = `https://nsec.app/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = url;

    // ここでは一旦 Promise を reject しておき、callback ページ側で処理
    throw new Error("Redirecting to nsec.app for authentication");
  } catch (err) {
    console.error("nsec.app login error:", err);
    throw err;
  }
}
