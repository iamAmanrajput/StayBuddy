import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Auth() {
  const [ok, setOk] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [token]); // Runs only when token changes

  return ok ? <Outlet /> : <Spinner />;
}

export default Auth;
