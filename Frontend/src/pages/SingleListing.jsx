import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { LiaRupeeSignSolid } from "react-icons/lia";

function SingleListing() {
  const { id } = useParams();
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/listing/${id}`, {
        withCredentials: true,
      });

      if (response.data && response.data.data) {
        setListingData(response.data.data);
      } else {
        toast.error("Listing Not Found");
      }
    } catch (error) {
      console.error("Error fetching listing:", error);
      toast.error("Listing Not Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <Loader />
      ) : listingData ? (
        <div className=" w-11/12 md:w-3/5 mx-auto mt-4 gap-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-golden text-center">
            {listingData.title}
          </h1>
          <img
            className=" md:w-[80%] md:h-[25rem] rounded-2xl"
            src={listingData.image}
            alt={listingData.title}
          />
          <div className="flex flex-col items-start w-full md:w-[80%] gap-2">
            <p className="text-xl">
              Owner :{console.log(listingData)}
              <span className="text-golden font-bold">
                {" "}
                {listingData.owner.userName}
              </span>
            </p>
            <p className="text-xl">
              <span className="font-bold">Description : </span>{" "}
              {listingData.description}
            </p>
            <p className="text-xl flex items-center">
              <span className="font-bold">Price : </span> <LiaRupeeSignSolid />
              {new Intl.NumberFormat("en-IN").format(listingData.price)}
            </p>
            <p className="text-xl">
              <span className="font-bold">Category : </span>{" "}
              {listingData.category}
            </p>
            <p className="text-xl">
              <span className="font-bold">Location : </span>{" "}
              {listingData.location}
            </p>
            <p className="text-xl">
              <span className="font-bold">Country : </span>{" "}
              {listingData.country}
            </p>
            <button className="btn mt-4 font-bold text-xl bg-gray-900 ">
              Book Now
            </button>
          </div>
          <div className="flex flex-col items-start w-full md:w-[80%] gap-2 border-t border-golden">
            <h1 className="font-bold text-3xl mt-4">Leave A Review</h1>
          </div>
        </div>
      ) : (
        <p>Listing Not Found</p>
      )}
    </div>
  );
}

export default SingleListing;
