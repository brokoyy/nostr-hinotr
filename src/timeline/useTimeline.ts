import { useState, useEffect } from "react";
import { relayInit, Filter, NostrEvent } from "nostr-tools";
import { fetchProfile } from "../api/fetchProfile";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"];

export interface TimelineEventWithProfile extends NostrEvent {
  profile?: { name?: string; picture?: string };
}

export function useTimeline(pubkey?: string) {
  const [events, setEvents] = useState<TimelineEventWithProfile[]>([]);
  const [profiles, setProfiles] = useState<Record<string, { name?: string; picture?: string }>>({});

  useEffect(() => {
    const relays = RELAYS.map((url) => {
      const relay = relayInit(url);
      relay.connect();
      return relay;
    });

    const filter: Filter = { kinds: [1], limit: 50 };

    const subs = relays.map((relay) => {
      const sub = relay.sub([filter]);

      sub.on("event", async (event: NostrEvent) => {
        setEvents((prev) => {
          if (prev.find((e) => e.id === event.id)) return prev;
          return [event, ...prev];
        });

        if (!profiles[event.pubkey]) {
          const profile = await fetchProfile(event.pubkey);
          setProfiles((prev) => ({ ...prev, [event.pubkey]: profile || {} }));
        }
      });

      return sub;
    });

    return () => {
      subs.forEach((sub) => sub.unsub());
      relays.forEach((relay) => relay.close());
    };
  }, [pubkey]);

  // プロフィールをイベントに紐付け
  return events.map((e) => ({
    ...e,
    profile: profiles[e.pubkey] || {},
  }));
}
