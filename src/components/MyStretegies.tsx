'use client';

import Box from './Box';
import { useEffect, useState } from 'react';

const MyStrategies = () => {
  const [activeStrategiesLoading, setActiveStrategiesLoading] = useState(false);
  const [activeStrategies, setActiveStrategies] = useState({});

  useEffect(() => {
    setActiveStrategiesLoading(true);
  }, []);

  return (
    <Box containerClass="min-h-[auto]" loading={activeStrategiesLoading}>
      <div></div>
    </Box>
  );
};

export default MyStrategies;
