import { getPublicKey } from "nostr-tools";

export async function loginWithNIP07() {
  if (!(window as any).nostr) throw new Error("NIP-07 not installed");
  const pubkey = await (window as any).nostr.getPublicKey();
  return { pubkey, method: "nip07" };
}

export async function loginWithNsecApp(nsec: string) {
  const pubkey = getPublicKey(nsec);
  return { pubkey, method: "nsec", nsec };
}

export function logout() {
  localStorage.removeItem("nostrAuth");
}
