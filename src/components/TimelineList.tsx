import React from "react";

export const TimelineList = ({ events }: { events: any[] }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {events.map((e, i) => (
        <li
          key={i}
          style={{
            borderBottom: "1px solid #ccc",
            padding: 10,
            marginBottom: 5
          }}
        >
          <img
            src={e.profile.picture || ""}
            alt="icon"
            width={32}
            height={32}
            style={{ borderRadius: "50%", verticalAlign: "middle", marginRight: 10 }}
          />
          <strong>{e.profile.name || e.pubkey}</strong>: {e.content}
        </li>
      ))}
    </ul>
  );
};
