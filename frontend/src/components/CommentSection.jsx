import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../auth";
import { toast } from "react-toastify";


export default function CommentSection({ postId }) {
  const { user, token } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${baseURL}/comments?postId=${postId}`)
      .then((res) => setComments(res.data))
      .catch(() => toast.error("Failed to load comments"));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = {
      postId,
      userId: user.id,
      author: user.name,
      text,
      date: new Date().toISOString(),
    };

    try {
      const res = await axios.post(`${baseURL}/comments`, newComment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => [...prev, res.data]);
      setText("");
      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) return;

    try {
      const updated = await axios.put(
        `${baseURL}/comments/${id}`,
        {
          ...comments.find((c) => c.id === id),
          text: editText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments((prev) =>
        prev.map((c) => (c.id === id ? updated.data : c))
      );
      setEditingCommentId(null);
      setEditText("");
      toast.success("Comment updated");
    } catch {
      toast.error("Failed to update comment");
    }
  };

  return (
    <div className="mt-8 p-4 bg-base-200 rounded-box shadow">
      <h3 className="text-lg font-semibold mb-4"> Comments</h3>

      {comments.map((c) => (
        <div key={c.id} className="mb-4 p-4 bg-white rounded-box border border-base-300">
          {editingCommentId === c.id ? (
            <>
              <textarea placeholder="Info" className="textarea textarea-info"
                value={editText}
                onChange={(e) => setEditText(e.target.value)} />

              <div className="flex gap-2">
                <button className="btn btn-success btn-sm" onClick={() => handleUpdate(c.id)}>Save</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditingCommentId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm mb-1">{c.text}</p>
              <p className="text-xs text-gray-500">by {c.author} – {new Date(c.date).toLocaleString()}</p>
              {user?.id === c.userId && (
                <div className="mt-2 flex gap-2">
                  <button className="btn btn-sm btn-outline btn-info" onClick={() => handleEdit(c)}>Edit</button>
                  <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(c.id)}>Delete</button>
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            className="textarea textarea-bordered  border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-soft btn-secondary btn-sm mt-2">Add Comment</button>
        </form>
      )}
    </div>
  );
}
