import React, { useState } from "react";
import { LoginControl } from "./components/LoginControl";
import { TimelineList } from "./components/TimelineList";
import { PostForm } from "./components/PostForm";
import { useTimeline } from "./timeline/useTimeline";

export const App = () => {
  const [nsec, setNsec] = useState<string>("");
  const events = useTimeline();

  return (
    <div>
      <h1>nostr-hinotr</h1>
      <LoginControl onLogin={(pubkey) => setNsec(pubkey)} />
      {nsec && <PostForm nsec={nsec} />}
      <TimelineList events={events} />
    </div>
  );
};
