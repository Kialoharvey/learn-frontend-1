import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");

  return (
    <section className="page">
      <h2>Contact Form</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <p>Hello, {name}</p>
    </section>
  );
}

export default Contact;