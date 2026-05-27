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
      <h1>Learn Front End 3 React Practice</h1>

      <p>
        This is Week 2 leaning plan continued on React components, props, state, and JSX fundamentals.
      </p>
      <button onClick={() => setLikes(likes + 1)}>
       Likes: {likes}
       </button>

      <CultureCard
        title="Papua New Guinea Culture & Tradition"
        description="PNG is known for its language diversity, traditions and mountainous geography."
      />

      <CultureCard
        title="React Component Practice"
        description="This card is a reusable React component using props."
      />
      <CultureCard
  title="Traditional PNG Dances"
  description="Traditional dances are used during celebrations, ceremonies and cultural festivals."
/>

<CultureCard
  title="PNG Food and Cooking"
  description="Many PNG communities cook food using earth ovens and natural ingredients."
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