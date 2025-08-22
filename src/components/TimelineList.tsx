import React from "react";
import { NostrEvent } from "nostr-tools";

interface Props {
  events: NostrEvent[];
}

export const TimelineList: React.FC<Props> = ({ events }) => {
  return (
    <div>
      {events.map((e) => (
        <div key={e.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 8 }}>
          <div><strong>{e.pubkey}</strong></div>
          <div>{e.content}</div>
        </div>
      ))}
    </div>
  );
};
