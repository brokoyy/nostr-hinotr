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
