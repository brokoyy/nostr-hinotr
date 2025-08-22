import { useState, useEffect } from "react";
import { relayInit, Filter, NostrEvent } from "nostr-tools";
import { fetchProfile } from "../api/fetchProfile";

const RELAYS = ["wss://r.kojira.io", "wss://yabu.me"];

interface TimelineEvent extends NostrEvent {
  profile?: { name?: string; picture?: string };
}

export function useTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
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

      sub.on("event", async (event) => {
        // TLに追加（重複排除）
        setEvents((prev) => {
          if (prev.find((e) => e.id === event.id)) return prev;
          return [event, ...prev];
        });

        // プロフィールが未取得なら取得
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
  }, []);

  // イベントにプロフィールを紐付けて返す
  const eventsWithProfile: TimelineEvent[] = events.map((e) => ({
    ...e,
    profile: profiles[e.pubkey] || {},
  }));

  return eventsWithProfile;
}
