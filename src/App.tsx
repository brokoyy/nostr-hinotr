import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Timeline from "./components/TimelineList";
import LoginButton from "./components/LoginButton";
import Callback from "./pages/auth/callback";

const App: React.FC = () => {
  const pubkey = typeof window !== "undefined" ? localStorage.getItem("pubkey") : null;

  return (
    <Router>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-6">Hinotr (Nostr Client)</h1>

        <Routes>
          <Route
            path="/"
            element={pubkey ? <Timeline events={[]} /> : <LoginButton />}
          />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
