import { relayInit, Filter } from "nostr-tools";

const RELAYS = ["wss://yabu.me/", "wss://r.kojira.io/"];

export async function fetchProfile(pubkey: string) {
  const profiles: Record<string, any> = {};
  await Promise.all(
    RELAYS.map(async (url) => {
      const relay = relayInit(url);
      await relay.connect();
      const filter: Filter = { kinds: [0], authors: [pubkey] };
      relay.on("event", (event) => {
        try {
          const content = JSON.parse(event.content);
          profiles[pubkey] = { name: content.name, picture: content.picture };
        } catch {}
      });
      relay.sub([filter]);
      setTimeout(() => relay.close(), 2000);
    })
  );
  return profiles[pubkey] || { name: pubkey, picture: "" };
}
