import React, { useEffect, useState } from "react";
import { NostrEvent } from "nostr-tools";
import { fetchProfile } from "../api/fetchProfile";

interface Props {
  events: NostrEvent[];
}

interface ProfileCache {
  [pubkey: string]: { name?: string; picture?: string };
}

export const TimelineList: React.FC<Props> = ({ events }) => {
  const [profiles, setProfiles] = useState<ProfileCache>({});

  useEffect(() => {
    events.forEach((e) => {
      if (!profiles[e.pubkey]) {
        fetchProfile(e.pubkey).then((profile) => {
          setProfiles((prev) => ({ ...prev, [e.pubkey]: profile || {} }));
        });
      }
    });
  }, [events]);

  return (
    <div>
      {events.map((e) => {
        const profile = profiles[e.pubkey] || {};
        return (
          <div key={e.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 8, display: "flex", alignItems: "center" }}>
            {profile.picture && (
              <img src={profile.picture} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 8 }} />
            )}
            <div>
              <div><strong>{profile.name || e.pubkey}</strong></div>
              <div>{e.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
