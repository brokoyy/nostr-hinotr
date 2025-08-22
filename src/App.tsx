import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import AuthCallback from "./pages/auth/callback";

function Home() {
  const pubkey = localStorage.getItem("pubkey");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hinotr Timeline</h1>
      {pubkey ? (
        <div>
          <p>ログイン中の pubkey:</p>
          <code className="break-all">{pubkey}</code>
        </div>
      ) : (
        <p>ログインしていません。</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginButton />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}
