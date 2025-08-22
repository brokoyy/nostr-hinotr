import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import TimelineList from "./components/TimelineList";
import LoginButton from "./components/LoginButton";
import { getSessionPubkey } from "./api/auth";
import Callback from "./api/callback";

function App() {
  const [pubkey, setPubkey] = useState<string | null>(null);

  useEffect(() => {
    // セッションからログイン状態を復元
    const storedPubkey = getSessionPubkey();
    if (storedPubkey) {
      setPubkey(storedPubkey);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="p-4 border-b border-gray-300 flex justify-between items-center">
          <h1 className="text-xl font-bold">Hinotr</h1>
          {pubkey ? (
            <span className="text-sm text-gray-600">
              Logged in: {pubkey.slice(0, 8)}...
            </span>
          ) : (
            <LoginButton onLogin={setPubkey} />
          )}
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<TimelineList pubkey={pubkey} />} />
            {/* nsec.app からの戻り先 */}
            <Route path="/callback" element={<Callback onLogin={setPubkey} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

