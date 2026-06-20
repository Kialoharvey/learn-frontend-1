import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    province: "",
    imageUrl: ""
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

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/culture-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not create post");
        return;
      }

      setMessage("Post created successfully!");
      navigate("/posts");
    } catch (error) {
      setMessage("Error creating post");
    }
  }

  return (
    <div>
      <h2>Create Culture Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Province:</label>
          <br />
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image URL:</label>
          <br />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Post</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default CreatePost;