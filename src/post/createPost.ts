import { relayInit, Event } from "nostr-tools";

const RELAYS = ["wss://yabu.me/", "wss://r.kojira.io/"];

export async function createPost(content: string, nsec: string) {
  const { getPublicKey, getEventHash, signEvent } = await import("nostr-tools");
  const pubkey = getPublicKey(nsec);
  const event: Event = {
    kind: 1,
    pubkey,
    created_at: Math.floor(Date.now() / 1000),
    content,
    tags: []
  };
  event.id = getEventHash(event);
  event.sig = await signEvent(event, nsec);

  const relays = RELAYS.map(url => relayInit(url));
  for (const relay of relays) {
    await relay.connect();
    relay.publish(event);
  }
}
