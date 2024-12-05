import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios

function Signup() {
  const navigate = useNavigate(); // Initialize navigate hook
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility
  const [error, setError] = useState(""); // Error state for validation

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.userName || !formData.email || !formData.password) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email.");
      toast.error("Please enter a valid email.");
      return;
    }

    // Clear error message before making the request
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/signup",
        formData,
        {
          withCredentials: true, // Important: allows sending cookies
        }
      );

      // If the response indicates success
      if (response.data.success) {
        toast.success("Sign up successful!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#1D232A",
            color: "#D8A54D",
          },
        });

        // Redirect to login page
        navigate("/login");
      } else {
        // If backend error message exists
        const backendError = response.data.message || "Something went wrong!";
        setError(backendError);
        toast.error(backendError);
      }

      // Reset the form data after successful submission
      setFormData({ userName: "", email: "", password: "" });
    } catch (error) {
      // If the error is from the backend or network-related, show the appropriate message
      const backendError =
        error.response?.data?.message || "An error occurred. Please try again.";
      setError(backendError);
      toast.error(backendError);
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
          src="https://images.unsplash.com/photo-1516562618495-ad1ff1a273f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="home img"
          className="w-full md:w-[85%] border-navyBlue rounded-2xl"
        />
      </div>
      <div className="w-full md:w-6/12 md:pl-4 pt-4 md:pt-0">
        <h1 className="font-bold text-4xl text-center">
          Signup on <span className="text-golden">StayBuddy</span>
        </h1>

        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label
            className="input input-bordered flex items-center gap-2 mt-8"
            htmlFor="userName"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              id="userName"
              name="userName"
              className="grow"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter Your Username"
              required
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 mt-4"
            htmlFor="email"
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
              id="email"
              name="email"
              className="grow"
              value={formData.email}
              placeholder="Enter Your Email"
              onChange={handleChange}
              required
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
              id="password"
              name="password"
              className="grow"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
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

          <button type="submit" className="btn font-bold text-base mt-4">
            Sign up
          </button>
        </form>

        <h1 className="text-2xl mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-golden opacity-70 hover:opacity-100"
          >
            Log in
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Signup;
