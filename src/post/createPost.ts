import { getEventHash, NostrEvent, SimplePool } from "nostr-tools";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"] as const;

export async function createPost(pubkey: string, content: string) {
  if (!window.nostr) throw new Error("NIP-07 extension not found");

  const event: NostrEvent = {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content,
    pubkey,
    id: "",
  };

  event.id = getEventHash(event);
  const signedEvent = await window.nostr.signEvent(event);

  const pool = new SimplePool();
  const pub = pool.publish(RELAYS, signedEvent);

  pub.on("ok", (relayUrl) => console.log(`Published to ${relayUrl}`));
  pub.on("failed", (relayUrl) => console.log(`Failed to publish to ${relayUrl}`));
}
