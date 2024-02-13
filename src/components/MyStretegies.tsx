'use client';

import Box from './Box';
import { getMyStrategies } from '@actions/strategies';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyStrategies = () => {
  const [activeStrategiesLoading, setActiveStrategiesLoading] = useState(false);
  const { isAuth } = useSelector((state: any) => state.customer);

  useEffect(() => {
    if (isAuth) {
      setActiveStrategiesLoading(true);
      getMyStrategies();
    }
  }, [isAuth]);

  return (
    <Box containerClass="min-h-[auto]" loading={activeStrategiesLoading}>
      <div></div>
    </Box>
  );
};

export default MyStrategies;
