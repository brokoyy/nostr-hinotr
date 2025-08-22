import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TimelineList, { TimelineEventWithProfile } from "./components/TimelineList";
import LoginButton from "./components/LoginButton";
import Callback from "./pages/auth/callback";
import { useTimeline } from "./timeline/useTimeline";
import { createPost } from "./post/createPost";

const App: React.FC = () => {
  const pubkey = typeof window !== "undefined" ? localStorage.getItem("pubkey") : null;
  const events: TimelineEventWithProfile[] = useTimeline(pubkey || undefined);
  const [newPost, setNewPost] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pubkey && newPost.trim()) {
      await createPost(pubkey, newPost);
      setNewPost("");
    }
  };

  return (
    <Router>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-6">Hinotr (Nostr Client)</h1>

        <Routes>
          <Route
            path="/"
            element={
              pubkey ? (
                <>
                  <form onSubmit={handleSubmit} className="mb-4">
                    <input
                      type="text"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="投稿内容"
                      className="border p-2 mr-2 rounded w-2/3"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                      投稿
                    </button>
                  </form>
                  <TimelineList events={events} />
                </>
              ) : (
                <LoginButton />
              )
            }
          />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
