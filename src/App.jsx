import { useState } from "react";
import "./App.css";

function CultureCard({ title, description }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function App() {
  const [likes, setLikes] = useState(0);

  return (
    <main className="app">
      <h1>PNG Culture React Practice</h1>

      <p>
        This project practices React components, props, state, and JSX.
      </p>

      <CultureCard
        title="Papua New Guinea Culture"
        description="PNG is known for its many languages, traditions, dances, and community values."
      />

      <CultureCard
        title="React Component Practice"
        description="This card is a reusable React component using props."
      />

      <section className="card">
        <h2>State Practice</h2>
        <p>Likes: {likes}</p>
        <button onClick={() => setLikes(likes + 1)}>
          Add Like
        </button>
      </section>
    </main>
  );
}

export default App;