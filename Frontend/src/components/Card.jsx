import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

function Card({ listingData }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listing/${listingData._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full md:w-[30%] mt-4 md:mt-0 cursor-pointer"
    >
      <img
        src={`${listingData.image}`}
        alt="Listing"
        className="w-full rounded-xl h-[300px] object-cover"
      />
      <h1 className="font-bold text-2xl text-golden mt-2">
        {listingData.title}
      </h1>
      <p className="text-xl flex items-center gap-1 opacity-60 mt-1">
        <CiLocationOn />
        {listingData.country}
      </p>
      <p className="text-xl flex items-center gap-1 mt-1">
        <LiaRupeeSignSolid />{" "}
        {new Intl.NumberFormat("en-IN").format(listingData.price)} Night
      </p>
    </div>
  );
}

export default Card;
