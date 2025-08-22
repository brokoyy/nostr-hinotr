import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TimelineList, { TimelineEventWithProfile } from "./components/TimelineList";
import LoginButton from "./components/LoginButton";
import Callback from "./pages/auth/callback";
import { useTimeline } from "./timeline/useTimeline";

const App: React.FC = () => {
  const pubkey = typeof window !== "undefined" ? localStorage.getItem("pubkey") : null;
  const events: TimelineEventWithProfile[] = useTimeline(pubkey || undefined);

  return (
    <Router>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-6">Hinotr (Nostr Client)</h1>

        <Routes>
          {/* ホームはログイン済みならタイムライン、未ログインならログインボタン */}
          <Route
            path="/"
            element={pubkey ? <TimelineList events={events} /> : <LoginButton />}
          />

          {/* nsec.app からのコールバック */}
          <Route path="/callback" element={<Callback />} />

          {/* それ以外はホームにリダイレクト */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
