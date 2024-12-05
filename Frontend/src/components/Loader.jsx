import React from "react";
import RingLoader from "react-spinners/RingLoader";
function Loader() {
  return (
    <div className="h-[50vh] w-full flex justify-center items-center px-4">
      <div className="flex flex-col justify-center items-center">
        <RingLoader color="#D8A54d" size={80} />
      </div>
    </div>
  );
}

export default Loader;
