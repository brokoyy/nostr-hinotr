import React, { useState } from "react";
import { LoginControl } from "./components/LoginControl";
import { TimelineList } from "./components/TimelineList";
import { PostForm } from "./components/PostForm";
import { useTimeline } from "./timeline/useTimeline";

export const App = () => {
  const [auth, setAuth] = useState<{ pubkey: string; nsec?: string } | null>(null);
  const events = useTimeline();

  return (
    <div style={{ padding: 20 }}>
      <h1>nostr-hinotr</h1>
      <LoginControl onLogin={setAuth} />
      {auth?.nsec && <PostForm nsec={auth.nsec} />}
      <TimelineList events={events} />
    </div>
  );
};
