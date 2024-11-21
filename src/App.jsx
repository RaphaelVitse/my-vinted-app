import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";

//COMPONENTS

import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route path="/user/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
