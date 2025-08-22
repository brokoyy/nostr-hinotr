import { useState, useEffect } from "react";
import { relayInit, Filter, NostrEvent } from "nostr-tools";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"];

export function useTimeline() {
  const [events, setEvents] = useState<NostrEvent[]>([]);

  useEffect(() => {
    const relays = RELAYS.map((url) => {
      const relay = relayInit(url);
      relay.connect();
      return relay;
    });

    const filter: Filter = { kinds: [1], limit: 50 };

    const subs = relays.map((relay) => {
      const sub = relay.sub([filter]);
      sub.on("event", (event) => {
        setEvents((prev) => {
          if (prev.find((e) => e.id === event.id)) return prev; // 重複排除
          return [event, ...prev];
        });
      });
      return sub;
    });

    return () => {
      subs.forEach((sub) => sub.unsub());
      relays.forEach((relay) => relay.close());
    };
  }, []);

  return events;
}
