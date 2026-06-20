import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Comments() {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch("http://localhost:3000/comments");
        const data = await response.json();

        if (response.ok) {
          setComments(data);
        } else {
          setMessage(data.message || "Could not load comments.");
        }
      } catch (error) {
        setMessage("Could not connect to API.");
      }
    }

    getComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <p>{message}</p>

      {comments.map((comment) => (
        <div className="post-card" key={comment._id}>
          <h3>{comment.username}</h3>
          <p>{comment.text}</p>

          <Link to={`/comments/${comment._id}`}>
            View Comment
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Comments;