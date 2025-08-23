import { relayInit, Filter } from "nostr-tools";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"] as const;

export async function fetchProfile(pubkey: string): Promise<{ name?: string; picture?: string } | null> {
  for (const url of RELAYS) {
    const relay = relayInit(url);
    try {
      await relay.connect();

      const filter: Filter = { kinds: [0], authors: [pubkey], limit: 1 };
      const sub = relay.sub([filter]);

      const profile = await new Promise<any>((resolve) => {
        let settled = false;

        const cleanup = () => {
          try {
            sub.unsub();
          } catch {}
          try {
            relay.close();
          } catch {}
        };

        sub.on("event", (event) => {
          if (settled) return;
          settled = true;
          try {
            const p = JSON.parse(event.content);
            resolve(p);
          } catch {
            resolve(null);
          } finally {
            cleanup();
          }
        });

        sub.on("eose", () => {
          if (settled) return;
          settled = true;
          resolve(null);
          cleanup();
        });

        // 念のためタイムアウト
        setTimeout(() => {
          if (settled) return;
          settled = true;
          resolve(null);
          cleanup();
        }, 5000);
      });

      if (profile) return profile;
    } catch {
      try { relay.close(); } catch {}
      // 次のリレーへフォールバック
    }
  }
  return null;
}
