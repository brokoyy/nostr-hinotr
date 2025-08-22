import React, { useState } from "react";
import { LoginButton } from "./components/LoginButton";
import { TimelineList } from "./components/TimelineList";
import { PostForm } from "./components/PostForm";
import { useTimeline } from "./timeline/useTimeline";

export const App: React.FC = () => {
  const [pubkey, setPubkey] = useState<string | null>(null);
  const events = useTimeline();

  return (
    <div style={{ padding: 20 }}>
      {!pubkey ? (
        <LoginButton onLogin={setPubkey} />
      ) : (
        <>
          <PostForm pubkey={pubkey} />
          <TimelineList events={events} />
        </>
      )}
    </div>
  );
};
