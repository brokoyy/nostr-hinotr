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
    <div style={{ marginBottom: 20 }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        rows={3}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};
