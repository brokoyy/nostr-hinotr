import { useEffect, useState } from "react";
import { relayInit, Filter } from "nostr-tools";
import { fetchProfile } from "../api/fetchProfile";

const RELAYS = ["wss://yabu.me/", "wss://r.kojira.io/"];

export function useTimeline() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const relays = RELAYS.map((url) => relayInit(url));
    relays.forEach((relay) => relay.connect());

    const filter: Filter = { kinds: [1], limit: 50 };
    relays.forEach((relay) => {
      relay.sub([filter]);
      relay.on("event", async (event) => {
        const profile = await fetchProfile(event.pubkey);
        setEvents((prev) => [{ ...event, profile }, ...prev]);
      });
    });

    return () => relays.forEach((r) => r.close());
  }, []);

  return events;
}
