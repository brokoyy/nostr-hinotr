import React, { useState } from "react";
import { createPost } from "../post/createPost";

interface Props {
  pubkey: string | null;
}

export const PostForm: React.FC<Props> = ({ pubkey }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubkey) return alert("Please connect your wallet first");
    await createPost(pubkey, content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a post..."
        rows={3}
        style={{ width: "100%" }}
      />
      <button type="submit">Post</button>
    </form>
  );
};
