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

  const getListingData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get("http://localhost:4000/listing", {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(addListings(response.data.data)); // Add data to Redux store
      } else {
        toast.error("No listings found");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (listings.length === 0) {
      getListingData();
    }
  }, [listings]);

  return (
    <div className="w-full">
      <div className="w-11/12 h-20 sm:h-12 mx-auto">
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
      <div className="bg-gray-900 w-full h-fit">
        <div className="w-11/12 mx-auto md:flex pt-4 gap-8 md:flex-wrap ">
          {/* Corrected nested map for listings */}
          {listings.map((innerArray, index) =>
            innerArray.map((listing) => {
              console.log(listing);
              return <Card key={listing._id} listingData={listing} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
