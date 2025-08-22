import React, { useState } from "react";
import { createPost } from "../post/createPost";

interface Props {
  pubkey: string;
}

export const PostForm: React.FC<Props> = ({ pubkey }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content) return;
    await createPost(pubkey, content);
    setContent("");
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        rows={3}
        style={{ width: "100%" }}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};
