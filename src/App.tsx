import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TimelineList, { TimelineEventWithProfile } from "./components/TimelineList";
import LoginButton from "./components/LoginButton";
import Callback from "./pages/auth/callback";

const App: React.FC = () => {
  const [events, setEvents] = useState<TimelineEventWithProfile[]>([]);
  const pubkey = typeof window !== "undefined" ? localStorage.getItem("pubkey") : null;

  useEffect(() => {
    // 仮のダミーデータ（実際は useTimeline フックや Nostr API を使用）
    if (pubkey) {
      const dummyEvents: TimelineEventWithProfile[] = [
        {
          id: "1",
          pubkey: "Alice",
          content: "こんにちは！",
          created_at: Date.now(),
        },
        {
          id: "2",
          pubkey: "Bob",
          content: "今日もいい天気ですね",
          created_at: Date.now(),
        },
      ];
      setEvents(dummyEvents);
    }
  }, [pubkey]);

  return (
    <Router>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-6">Hinotr (Nostr Client)</h1>

        <Routes>
          <Route
            path="/"
            element={pubkey ? <TimelineList events={events} /> : <LoginButton />}
          />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
