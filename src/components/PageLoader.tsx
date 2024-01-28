'use client';

import Loader from './Loader';
import StoreWrapper from './StoreWrapper';
import { useSelector } from 'react-redux';

const Spinner = () => {
  const userLoaded = useSelector((state: any) => state.customer.loaded);
  if (userLoaded) {
    return;
  }
  return (
    <div
      className="flex spinner h-screen w-screen bg-white z-50 fixed items-center justify-center space-x-2 overflow-hidden"
      data-testid="page-spinner"
    >
      <Loader className="!h-10 !w-10" />
    </div>
  );
};

const PageLoader = () => {
  return (
    <StoreWrapper>
      <Spinner />
    </StoreWrapper>
  );
};

export default PageLoader;
