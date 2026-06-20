import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateComment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    culturePost: "",
    username: "",
    text: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not create comment.");
        return;
      }

      setMessage("Comment created successfully.");

      setTimeout(() => {
        navigate("/comments");
      }, 1000);
    } catch (error) {
      setMessage("Could not connect to API.");
    }
  }

  return (
    <div>
      <h1>Create Comment</h1>

      <form onSubmit={handleSubmit}>
        <label>Culture Post ID:</label>
        <input
          name="culturePost"
          value={formData.culturePost}
          onChange={handleChange}
          required
        />

        <label>Username:</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Comment:</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Comment</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default CreateComment;