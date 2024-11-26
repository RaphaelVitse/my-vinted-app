import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// PAGES

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

//COMPONENTS

import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [title, setTitle] = useState("");
  const [btnFilterAsc, setBtnFilterAsc] = useState(true);

  return (
    <>
      <Router>
        <Header
          token={token}
          setToken={setToken}
          title={title}
          setTitle={setTitle}
          btnFilter={btnFilterAsc}
          setBtnFilter={setBtnFilterAsc}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                title={title}
                setTitle={setTitle}
                btnFilter={btnFilterAsc}
                setBtnFilter={setBtnFilterAsc}
              />
            }
          />
          <Route path="/offers/:id" element={<Offer token={token} />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment token={token} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
