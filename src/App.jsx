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
      <h1>Week 1 React Practice on my website</h1>

      <p>
        This Week 1 project practices React components, props, state, and JSX fundamentals.
      </p>

      <CultureCard
        title="Papua New Guinea Culture & Tradition"
        description="PNG is known for its language diversity, traditions and mountainous geography."
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