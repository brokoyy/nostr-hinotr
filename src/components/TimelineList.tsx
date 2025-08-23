import React from "react";

export const TimelineList = ({ events }: { events: any[] }) => {
  return (
    <ul>
      {events.map((e, i) => (
        <li key={i}>
          <img src={e.profile.picture || ""} alt="icon" width={32} />
          <strong>{e.profile.name || e.pubkey}</strong>: {e.content}
        </li>
      ))}
    </ul>
  );
};
