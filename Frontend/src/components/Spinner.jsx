import React, { useState, useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";
import { useNavigate } from "react-router-dom";

function Spinner() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    // Set interval to decrement the count every second
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);

    // Clean up the interval when component unmounts or count changes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // When count reaches 0, navigate to login
    if (count === 0) {
      navigate(`/login`);
    }
  }, [count, navigate]); // Effect depends on count and navigate

  return (
    <div className="h-[50vh] w-full flex justify-center items-center px-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[3rem]">
          Redirecting you in {count} second{count !== 1 ? "s" : ""}
        </h1>
        <RingLoader color="#D8A54d" size={80} />
        <span className="visually-hidden text-[3rem]">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
