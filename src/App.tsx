import React, { useState } from "react";
import { LoginButton } from "./components/LoginButton";
import { PostForm } from "./components/PostForm";
import { TimelineList } from "./components/TimelineList";
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

import AuthCallback from "./src/api/callback";

// ルート定義に追加
<Route path="./src/api/callback" element={<AuthCallback />} />
