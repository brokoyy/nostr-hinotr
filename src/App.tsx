import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Timeline from "./components/TimelineList";
import LoginButton from "./components/LoginButton";
import Callback from "./api/callback";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hinotr (Nostr Client)</h1>
        <LoginButton />
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
