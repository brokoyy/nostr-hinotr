import { relayInit, getEventHash, NostrEvent } from "nostr-tools";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"] as const;

declare global {
  interface Window {
    nostr?: {
      signEvent: (event: any) => Promise<any>;
    };
  }
}

export async function createPost(pubkey: string, content: string) {
  if (!window.nostr) throw new Error("NIP-07 extension not found");
  if (!content.trim()) return;

  const event: NostrEvent = {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content,
    pubkey,
    id: "" as any
  };

  event.id = getEventHash(event);
  const signedEvent = await window.nostr.signEvent(event);

  await Promise.all(
    RELAYS.map(async (url) => {
      const relay = relayInit(url);
      await relay.connect();
      const pub = relay.publish(signedEvent);
      await new Promise<void>((resolve) => {
        pub.on("ok", () => resolve());
        pub.on("failed", () => resolve());
        setTimeout(() => resolve(), 5000);
      });
      try { relay.close(); } catch {}
    })
  );
}
