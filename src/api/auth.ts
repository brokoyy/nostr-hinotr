// NIP-07 / nsec.app 認証系（秘密鍵の保存はしない）

// window.nostr の型ガード（軽量）
declare global {
  interface Window {
    nostr?: {
      getPublicKey: () => Promise<string>;
      signEvent: (event: any) => Promise<any>;
    };
  }
}

export async function loginWithNip07(): Promise<string> {
  if (!window.nostr) {
    alert("NIP-07対応拡張機能が必要です");
    throw new Error("No NIP-07 extension found");
  }
  const pubkey = await window.nostr.getPublicKey();
  localStorage.setItem("pubkey", pubkey);
  return pubkey;
}

// nsec.app でログイン（callback は /callback に固定）
export function loginWithNsecApp(): void {
  const origin = window.location.origin;
  const redirectUri = `${origin}/callback`;
  const url = `https://nsec.app/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = url;
}

export function logout(): void {
  localStorage.removeItem("pubkey");
}
