import React from "react";
import { TimelineEventWithProfile } from "../hooks/useTimeline";

interface Props {
  events: TimelineEventWithProfile[];
}

export const TimelineList: React.FC<Props> = ({ events }) => {
  return (
    <ul>
      {events.map((e) => (
        <li key={e.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "0.5rem" }}>
          <div>
            <strong>{e.profile?.name || e.pubkey}</strong>
          </div>
          <div>{e.content}</div>
        </li>
      ))}
    </ul>
  );
};
