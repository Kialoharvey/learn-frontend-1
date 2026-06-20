import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommentDetails() {
  const { id } = useParams();

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
        </div>
      )}
    </div>
  );
}

export default CommentDetails;