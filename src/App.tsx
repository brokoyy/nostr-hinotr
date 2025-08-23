import React from "react";
import { LoginControl } from "./components/LoginControl";
import { PostForm } from "./components/PostForm";
import { TimelineList } from "./components/TimelineList";
import { useAuth } from "./api/auth";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">nostr-hinotr</h1>
      <LoginControl />
      {user && (
        <>
          <PostForm />
          <TimelineList />
        </>
      )}
    </div>
  );
};

export default App;
