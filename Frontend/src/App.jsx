import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Pagenotfound from "./pages/Pagenotfound";
import Auth from "./routes/Auth";
import NewListing from "./components/NewListing";
import Spinner from "./components/Spinner";
import SingleListing from "./pages/SingleListing";
function App() {
  return (
    <>
      <div className="max-w-full bg-gray-800">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/listing/:id" element={<SingleListing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/spinner" element={<Spinner />}></Route>
          <Route path="/create-listing" element={<Auth />}>
            <Route index element={<NewListing />}></Route>
          </Route>
          <Route path="*" element={<Pagenotfound />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
