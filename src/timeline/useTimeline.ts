import { useState, useEffect, useRef } from "react";
import * as nostr from "nostr-tools";
import { fetchProfile } from "../api/fetchProfile";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"] as const;

export interface TimelineEventWithProfile extends nostr.NostrEvent {
  profile?: { name?: string; picture?: string };
}

export function useTimeline(pubkey?: string | null) {
  const [events, setEvents] = useState<TimelineEventWithProfile[]>([]);
  const profilesRef = useRef<Record<string, { name?: string; picture?: string }>>({});

  useEffect(() => {
    if (!pubkey) {
      setEvents([]);
      return;
    }

    const relays = RELAYS.map((url) => {
      const relay = nostr.relayInit(url);
      relay.connect();
      return relay;
    });

    const filter: nostr.Filter = { kinds: [1], limit: 50 };

    const subs = relays.map((relay) => {
      const sub = relay.sub([filter]);

      sub.on("event", async (event: nostr.NostrEvent) => {
        setEvents((prev) => {
          if (prev.some((e) => e.id === event.id)) return prev;
          const next = [event as TimelineEventWithProfile, ...prev];
          next.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
          return next.slice(0, 200);
        });

        const pk = event.pubkey;
        if (!profilesRef.current[pk]) {
          const profile = await fetchProfile(pk);
          profilesRef.current[pk] = profile || {};
          setEvents((prev) =>
            prev.map((e) => (e.pubkey === pk ? { ...e, profile: profilesRef.current[pk] } : e))
          );
        }
      });

      return sub;
    });

    return () => {
      subs.forEach((s) => s.unsub());
      relays.forEach((r) => r.close());
    };
  }, [pubkey]);

  return events.map((e) => ({ ...e, profile: e.profile || profilesRef.current[e.pubkey] || {} }));
}
