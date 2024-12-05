import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader"; // Assuming you have a Loader component

function NewListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null, // Store file directly
    category: "",
    price: "",
    country: "",
    location: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const changeHandler = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value, // Handle file input for images
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const { title, description, category, price, country, location } = formData;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !country ||
      !location
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true); // Set loading to true when submitting the form

    const formDataToSend = new FormData(); // Create FormData object
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/listing/create",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Important: allows sending cookies
        }
      );

      if (response.data.success) {
        toast.success("Listing Created Successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#1D232A",
            color: "#D8A54D",
          },
        });
        navigate("/"); // Redirect to home page
      }

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        image: null,
        category: "",
        price: "",
        country: "",
        location: "",
      });
    } catch (error) {
      toast.error("Failed to create listing. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after request is completed
    }
  };

  return (
    <div className="w-11/12 flex mx-auto mt-12 flex-col md:flex-row pb-4">
      <div className="w-full md:w-6/12 pt-4 md:h-[28rem]">
        <img
          src="https://images.unsplash.com/photo-1515541369882-f47fa81d1454?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="home img"
          className="w-full md:w-[85%] border-navyBlue rounded-2xl md:h-full"
        />
      </div>
      <div className="w-full md:w-6/12 md:pl-4 pt-4 md:pt-0">
        <h1 className="font-bold text-4xl text-center mb-4">
          Create a New<span className="text-golden"> Listing</span>
        </h1>
        {!loading ? (
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Your Title"
              className="input input-bordered w-full mb-2"
              name="title"
              value={formData.title}
              required
              onChange={changeHandler}
            />
            <textarea
              placeholder="Enter Description"
              className="textarea textarea-bordered textarea-lg w-full mb-2"
              name="description"
              required
              value={formData.description}
              onChange={changeHandler}
            ></textarea>
            <input
              type="file"
              className="input input-bordered w-full mb-2 pt-2"
              name="image"
              onChange={changeHandler}
            />
            <select
              className="select select-bordered w-full mb-2"
              name="category"
              value={formData.category}
              required
              onChange={changeHandler}
            >
              <option value="" disabled>
                Choose Category
              </option>
              <option value="farm">Farm</option>
              <option value="city">City</option>
              <option value="beachFront">Beachfront</option>
              <option value="mountain">Mountain</option>
            </select>

            <div className="w-full flex gap-1">
              <input
                type="number"
                placeholder="Enter Price"
                className="input input-bordered w-full mb-2"
                name="price"
                value={formData.price}
                required
                onChange={changeHandler}
              />
              <input
                type="text"
                placeholder="Enter Country"
                className="input input-bordered w-full mb-2"
                name="country"
                value={formData.country}
                required
                onChange={changeHandler}
              />
            </div>

            <input
              type="text"
              placeholder="Enter Location"
              className="input input-bordered w-full mb-2"
              name="location"
              value={formData.location}
              required
              onChange={changeHandler}
            />
            <button
              type="submit"
              className="btn font-bold text-base mt-4"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Submitting..." : "Add"}
            </button>
          </form>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default NewListing;
