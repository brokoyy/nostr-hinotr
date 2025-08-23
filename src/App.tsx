import React, { useState } from "react";
import { PostForm } from "./components/PostForm";
import { TimelineList } from "./components/TimelineList";
import { useTimeline } from "./timeline/useTimeline";

export default function App() {
  const [pubkey, setPubkey] = useState<string | null>(null);

  const timeline = useTimeline(pubkey);

  return (
    <div>
      <h1>Nostr Hinotr</h1>
      <PostForm pubkey={pubkey} />
      <TimelineList events={timeline} />
    </div>
  );
}
