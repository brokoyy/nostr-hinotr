import { Filter, SimplePool } from "nostr-tools";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"] as const;

export async function fetchProfile(pubkey: string) {
  const pool = new SimplePool();
  const filter: Filter = { kinds: [0], authors: [pubkey], limit: 1 };

  return new Promise<any>((resolve) => {
    const sub = pool.sub(RELAYS, [filter]);
    sub.on("event", (event) => {
      try {
        const profile = event.content ? JSON.parse(event.content) : null;
        resolve(profile);
      } catch {
        resolve(null);
      }
    });
    sub.on("eose", () => resolve(null));
  });
}
