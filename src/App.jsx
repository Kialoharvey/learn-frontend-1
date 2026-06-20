import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import backgroundImage from "./assets/img01.png";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Comments from "./pages/Comments";
import CommentDetails from "./pages/CommentDetails";
import CreateComment from "./pages/CreateComment";


function App() {
  return (
    <BrowserRouter>
      <main
        className="app"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.78), rgba(0,0,0,.82)), url(${backgroundImage})`
        }}
      >
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
          <Link to="/posts">Culture Posts</Link>
          <Link to="/posts/create">Create Post</Link>
          <Link to="/comments">Comments</Link>
          <Link to="/comments/create">Create Comment</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />

          <Route path="/comments" element={<Comments />} />
          <Route path="/comments/create" element={<CreateComment />} />
          <Route path="/comments/:id" element={<CommentDetails />} />
          
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;