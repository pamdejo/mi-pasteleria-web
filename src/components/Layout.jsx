import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  
  return (
    <>
      {<Header />}
      <Outlet />
    </>
  );
}