"use client";

import StoreWrapper from "./StoreWrapper";
import { useSelector } from "react-redux";

const Loader = () => {
  const userLoaded = useSelector((state: any) => state.customer.loaded);
  if (userLoaded) {
    return;
  }
  return (
    <div
      className="flex spinner h-screen w-screen bg-white z-50 fixed items-center justify-center space-x-2 overflow-hidden"
      data-testid="page-spinner"
    >
      <div className="w-6 h-6 bg-blue-400 rounded-full bounce1"></div>
      <div className="w-6 h-6 bg-yellow-400 rounded-full bounce2"></div>
      <div className="w-6 h-6 bg-green-400 rounded-full bounce3"></div>
      <div className="w-6 h-6 bg-red-400 rounded-full bounce4"></div>
    </div>
  );
};

const PageLoader = () => {
  return (
    <StoreWrapper>
      <Loader />
    </StoreWrapper>
  );
};

export default PageLoader;
