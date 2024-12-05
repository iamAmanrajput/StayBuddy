import React from "react";
import { MdErrorOutline } from "react-icons/md";

function Pagenotfound() {
  return (
    <div className="h-[50vh] w-full">
      <div className="flex h-full w-full justify-center items-center font-bold text-[3rem]  text-center">
        <MdErrorOutline className="hidden md:block mr-4 text-golden" />
        <p>
          <span className="text-golden">Error 404 :</span> Page Not Found !
        </p>
      </div>
    </div>
  );
}

export default Pagenotfound;
