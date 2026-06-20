import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getPost() {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please log in first.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/culture-posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (response.ok) {
          setPost(data);
        } else {
          setMessage(data.message || "Could not load post.");
        }
      } catch (error) {
        setMessage("Could not connect to API.");
      }
    }

    getPost();
  }, [id]);

  async function handleDelete() {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/culture-posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Post deleted successfully.");
        navigate("/posts");
      } else {
        setMessage(data.message || "Could not delete post.");
      }
    } catch (error) {
      setMessage("Could not connect to API.");
    }
  }

  return (
    <div>
      <h1>Culture Post Details</h1>

      <p>{message}</p>

      {post && (
        <div className="details-box">
          <h2>{post.title}</h2>

          <p>{post.description}</p>

          <p>
            <strong>Province:</strong> {post.province}
          </p>

          {post.imageUrl && (
            <p>
              <strong>Image URL:</strong> {post.imageUrl}
            </p>
          )}

          <br />

          <Link to={`/posts/${id}/edit`}>
            <button>Edit Post</button>
          </Link>

          <br />
          <br />

          <button onClick={handleDelete}>
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetails;