import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getPosts() {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please log in first.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/culture-posts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setMessage(data.message || "Could not load posts.");
        }
      } catch (error) {
        setMessage("Could not connect to API.");
      }
    }

    getPosts();
  }, []);

  return (
    <div>
      <h1 className="culture-title">Culture Posts</h1>

      <p>{message}</p>

      {posts.map((post) => (
        <div className="card" key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.province}</p>
          <Link to={`/posts/${post._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Posts;