// NIP-07拡張でログイン
export async function loginWithNip07(): Promise<string> {
  if (!window.nostr) {
    alert("NIP-07対応拡張機能が必要です");
    throw new Error("No NIP-07 extension found");
  }

  const pubkey = await window.nostr.getPublicKey();
  localStorage.setItem("pubkey", pubkey);
  return pubkey;
}

// nsec.app でログイン
export function loginWithNsecApp(): void {
  const redirectUri = `${window.location.origin}/callback`; // App と統一
  const url = `https://nsec.app/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = url; // リダイレクト
}
