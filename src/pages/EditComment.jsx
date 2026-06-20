jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditComment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    text: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchComment() {
      try {
        const response = await fetch(
          `http://localhost:3000/comments/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setFormData({
            username: data.username || "",
            text: data.text || ""
          });
        } else {
          setMessage(data.message || "Could not load comment.");
        }
      } catch (error) {
        setMessage("Could not connect to API.");
      }
    }

    fetchComment();
  }, [id]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/comments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Comment updated successfully.");

        setTimeout(() => {
          navigate(`/comments/${id}`);
        }, 1000);
      } else {
        setMessage(data.message || "Could not update comment.");
      }
    } catch (error) {
      setMessage("Could not connect to API.");
    }
  }

  return (
    <div>
      <h1>Edit Comment</h1>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
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

        <button type="submit">
          Update Comment
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default EditComment;