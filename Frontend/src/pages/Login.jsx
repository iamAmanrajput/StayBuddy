// Your Login Component
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setCurrUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Both fields are required!");
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${apiUrl}/login`, formData, {
        withCredentials: true, // Important: allows sending cookies
      });
      if (response.data.success) {
        toast("Login Successfully", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#1D232A",
            color: "#D8A54D",
          },
        });

        // Adding values in localStorage and Redux
        dispatch(setToken(response.data.token));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        dispatch(setCurrUser(response.data.user._id));
        localStorage.setItem(
          "currUser",
          JSON.stringify(response.data.user._id)
        );
        navigate("/");
      }

      // Reset form after successful login
      setFormData({ email: "", password: "" });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="w-11/12 flex mx-auto mt-12 flex-col md:flex-row pb-4">
      <div className="w-full md:w-6/12">
        <img
          src="https://images.unsplash.com/photo-1515937472778-f6acc7c30ba4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="home img"
          className="w-full md:w-[85%] border-navyBlue rounded-2xl"
        />
      </div>
      <div className="w-full md:w-6/12 md:pl-4 pt-4 md:pt-0">
        <h1 className="font-bold text-4xl text-center">
          Login on <span className="text-golden">StayBuddy</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="input input-bordered flex items-center gap-2 mt-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
              aria-hidden="true"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              name="email"
              className="grow"
              value={formData.email}
              placeholder="Enter Your Email"
              onChange={handleChange}
            />
          </label>
          <label
            className="input input-bordered flex items-center gap-2 mt-4"
            htmlFor="password"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
              name="password"
              className="grow"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 focus:outline-none"
              aria-label="Toggle password visibility"
            >
              {isPasswordVisible ? (
                <AiOutlineEyeInvisible className="h-5 w-5" />
              ) : (
                <AiOutlineEye className="h-5 w-5" />
              )}
            </button>
          </label>
          <button className="btn font-bold text-base mt-4">Login</button>
        </form>
        <h1 className="text-2xl mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-golden opacity-70 hover:opacity-100"
          >
            Sign Up
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Login;
