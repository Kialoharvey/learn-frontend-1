import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="page">
      <h2>Contact Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <button type="submit">Send Message</button>
      </form>

      {submitted && (
        <p>
          Thank you, {name}. Your message has been received.
        </p>
      )}
    </section>
  );
}

export default Contact;