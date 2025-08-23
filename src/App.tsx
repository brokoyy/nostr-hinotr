import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TimelineList, { TimelineEventWithProfile } from "./components/TimelineList";
import LoginControl from "./components/LoginControl";
import Callback from "./pages/auth/callback";
import { useTimeline } from "./timeline/useTimeline";

const App: React.FC = () => {
  const [pubkey, setPubkey] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("pubkey") : null
  );

  const events = useTimeline(); // タイムライン取得

  const handleLogout = () => {
    localStorage.removeItem("pubkey");
    setPubkey(null);
  };

  return (
    <Router>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-6">Hinotr (Nostr Client)</h1>

        <Routes>
          <Route
            path="/"
            element={<>{pubkey ? <TimelineList events={events} /> : <LoginControl pubkey={pubkey} onLogout={handleLogout} />}</>}
          />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
