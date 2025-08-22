import { relayInit, getEventHash, NostrEvent } from "nostr-tools";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"];

export async function createPost(pubkey: string, content: string) {
  if (!window.nostr) throw new Error("NIP-07 extension not found");

  const event: NostrEvent = {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content,
    pubkey,
  };

  event.id = getEventHash(event);
  const signedEvent = await window.nostr.signEvent(event);

  RELAYS.forEach(async (url) => {
    const relay = relayInit(url);
    await relay.connect();
    const pub = relay.publish(signedEvent);
    pub.on("ok", () => console.log(`Post published to ${url}`));
    pub.on("failed", () => console.log(`Failed to publish to ${url}`));
  });
}
