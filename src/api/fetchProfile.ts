import * as nostr from "nostr-tools";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"] as const;

export async function fetchProfile(pubkey: string) {
  for (const url of RELAYS) {
    const relay = nostr.relayInit(url);
    await relay.connect();

    const filter = { kinds: [0], authors: [pubkey], limit: 1 };
    const sub = relay.sub([filter]);

    return new Promise<any>((resolve) => {
      sub.on("event", (event) => {
        if (event.content) {
          try {
            const profile = JSON.parse(event.content);
            resolve(profile);
          } catch {
            resolve(null);
          }
        }
      });
    });
  }
}
