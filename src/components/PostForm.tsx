import React, { useState } from "react";
import { createPost } from "../post/createPost";

export const PostForm: React.FC = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createPost(content);
      setContent("");
    } catch (err) {
      console.error("投稿失敗:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col space-y-3 rounded-2xl shadow bg-white"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="いまどうしてる？"
        className="w-full border rounded-lg p-2"
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-xl bg-blue-500 text-white disabled:opacity-50"
      >
        {loading ? "投稿中..." : "投稿"}
      </button>
    </form>
  );
};
