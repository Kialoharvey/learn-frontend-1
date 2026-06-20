jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function CommentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getComment() {
      try {
        const response = await fetch(`http://localhost:3000/comments/${id}`);
        const data = await response.json();

        if (response.ok) {
          setComment(data);
        } else {
          setMessage(data.message || "Could not load comment.");
        }
      } catch (error) {
        setMessage("Could not connect to API.");
      }
    }

    getComment();
  }, [id]);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/comments/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Comment deleted successfully.");
        navigate("/comments");
      } else {
        setMessage(data.message || "Could not delete comment.");
      }
    } catch (error) {
      setMessage("Could not connect to API.");
    }
  }

  return (
    <div>
      <h1>Comment Details</h1>

      <p>{message}</p>

      {comment && (
        <div className="details-box">
          <h2>{comment.username}</h2>

          <p>{comment.text}</p>

          <p>
            <strong>Culture Post:</strong>{" "}
            {comment.culturePost?.title || comment.culturePost}
          </p>

          <br />

          <Link to={`/comments/${id}/edit`}>
            <button>Edit Comment</button>
          </Link>

          <br />

          <button onClick={handleDelete}>
            Delete Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentDetails;
