import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    province: "",
    imageUrl: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(`http://localhost:3000/culture-posts/${id}`);
      const data = await response.json();

      setFormData({
        title: data.title || "",
        description: data.description || "",
        province: data.province || "",
        imageUrl: data.imageUrl || ""
      });
    }

    fetchPost();
  }, [id]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/culture-posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Could not update post.");
      return;
    }

    setMessage("Post updated successfully.");

    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 1000);
  }

  return (
    <div>
      <h2>Edit Culture Post</h2>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Province:</label>
        <input
          name="province"
          value={formData.province}
          onChange={handleChange}
          required
        />

        <label>Image URL:</label>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">Update Post</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default EditPost;