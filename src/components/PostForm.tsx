import React, { useState } from "react";
import { createPost } from "../post/createPost";

export const PostForm = ({ nsec }: { nsec: string }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content) return;
    await createPost(content, nsec);
    setContent("");
  };

  return (
    <div>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};
