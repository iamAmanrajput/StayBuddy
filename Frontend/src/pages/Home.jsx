import React from "react";
import { GiFarmTractor } from "react-icons/gi";
import { FaCity, FaPersonSwimming } from "react-icons/fa6";
import { PiMountains } from "react-icons/pi";
import { FaFireAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="w-full">
      <div className="w-11/12 h-20  sm:h-12 mx-auto ">
        <ul className="flex justify-between items-center h-full font-bold text-2xl text-golden">
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row items-center gap-1">
              <FaFireAlt /> <p className="text-xl">Trending</p>
            </Link>
          </li>
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row  items-center gap-1">
              <GiFarmTractor /> <p className="text-xl">Farm</p>
            </Link>
          </li>
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row  items-center gap-1">
              <FaCity /> <p className="text-xl">City</p>
            </Link>
          </li>
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row  items-center gap-1">
              <FaPersonSwimming /> <p className="text-xl">BeachFront</p>
            </Link>
          </li>
          <li className="no-underline opacity-60 hover:opacity-100">
            <Link className="flex flex-col md:flex-row  items-center gap-1">
              <PiMountains /> <p className="text-xl">Mountain</p>
            </Link>
          </li>
        </ul>
        {/*this is listing section */}
      </div>
      <div className="bg-gray-900 w-full"></div>
    </div>
  );
}

export default Home;
