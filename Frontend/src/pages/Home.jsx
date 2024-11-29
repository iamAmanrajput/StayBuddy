import React, { useEffect } from "react";
import { GiFarmTractor } from "react-icons/gi";
import { FaCity, FaPersonSwimming } from "react-icons/fa6";
import { PiMountains } from "react-icons/pi";
import { FaFireAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setLoading, addListings } from "../redux/slices/listingSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import axios from "axios";
import { toast } from "react-hot-toast";

function Home() {
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listing);

  useEffect(() => {
    // Fetch data only once if listings is empty
    const getListingData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get("http://localhost:4000/listing", {
          withCredentials: true,
        });
        if (response.data.success) {
          // Dispatch the action to add listings to the Redux store
          dispatch(addListings(response.data.data)); // Assuming data is an array
        } else {
          toast.error("No listings found");
        }
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (listings.length === 0) {
      getListingData(); // Call API only if listings are empty
    }
  }, [dispatch, listings.length]); // Dependency array to prevent redundant calls
  return (
    <div className="w-full">
      <div className="w-11/12 h-20 sm:h-12 mx-auto ">
        <ul className="flex justify-between items-center h-full font-bold text-2xl text-golden">
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row items-center gap-1">
              <FaFireAlt /> <p className="text-xl">Trending</p>
            </Link>
          </li>
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row items-center gap-1">
              <GiFarmTractor /> <p className="text-xl">Farm</p>
            </Link>
          </li>
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row items-center gap-1">
              <FaCity /> <p className="text-xl">City</p>
            </Link>
          </li>
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row items-center gap-1">
              <FaPersonSwimming /> <p className="text-xl">BeachFront</p>
            </Link>
          </li>
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row items-center gap-1">
              <PiMountains /> <p className="text-xl">Mountain</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bg-gray-900 w-full">
        <div className="w-11/12">
          {/* Display listings */}
          {listings.map((listing, index) => (
            <Card key={index} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
