import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { LiaRupeeSignSolid } from "react-icons/lia";
function Card({ listingData }) {
  return (
    <div className="w-full md:w-[30%] mt-4 md:mt-0">
      <img src={`${listingData.image}`} alt="" className="w-full rounded-xl" />
      <h1 className="font-bold text-2xl text-golden mt-2">
        {listingData.title}
      </h1>
      <p className="text-xl flex items-center gap-1 opacity-60 mt-1">
        <CiLocationOn />
        {listingData.country}
      </p>
      <p className="text-xl flex items-center gap-1 mt-1">
        <LiaRupeeSignSolid />{" "}
        {new Intl.NumberFormat("en-IN").format(`${listingData.price}`)} Night
      </p>
    </div>
  );
}

export default Card;
