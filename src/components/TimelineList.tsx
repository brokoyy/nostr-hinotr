import React from "react";
import { NostrEvent } from "nostr-tools";

interface TimelineEventWithProfile extends NostrEvent {
  profile?: { name?: string; picture?: string };
}

interface Props {
  events: TimelineEventWithProfile[];
}

const TimelineList: React.FC<Props> = ({ events }) => {
  return (
    <div>
      {events.map((e) => {
        const profile = e.profile || {};
        return (
          <div
            key={e.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            {profile.picture && (
              <img
                src={profile.picture}
                alt="avatar"
                style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 8 }}
              />
            )}
            <div>
              <div>
                <strong>{profile.name || e.pubkey}</strong>
              </div>
              <div>{e.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineList;
