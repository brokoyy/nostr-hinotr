import { useState, useEffect, useRef } from "react";
import { Filter, NostrEvent, SimplePool } from "nostr-tools";
import { fetchProfile } from "../api/fetchProfile";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"] as const;

export interface TimelineEventWithProfile extends NostrEvent {
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

    const pool = new SimplePool();
    const filter: Filter = { kinds: [1], limit: 50 };
    const sub = pool.sub(RELAYS, [filter]);

    sub.on("event", async (event: NostrEvent) => {
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

    return () => sub.unsub();
  }, [pubkey]);

  return events.map((e) => ({ ...e, profile: e.profile || profilesRef.current[e.pubkey] || {} }));
}
