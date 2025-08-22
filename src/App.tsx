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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AuthCallback from "./pages/auth/callback";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<div>ホーム画面</div>} />
      </Routes>
    </Router>
  );
}
