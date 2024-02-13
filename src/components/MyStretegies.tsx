'use client';

import Box from './Box';
import { getMyStrategiesAction } from '@actions/strategies';
import { strategy_prop } from '@mytypes/strategy';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyStrategies = () => {
  const [myStrategiesLoading, setMyStrategiesLoading] = useState(false);
  const [myStragegies, setMyStrategies] = useState([]);
  const { isAuth } = useSelector((state: any) => state.customer);

  const getMyStrategies = async () => {
    const allStrategies = await getMyStrategiesAction();
    console.log('🚀 All strategies', allStrategies);
    setMyStrategies(allStrategies);
    setMyStrategiesLoading(false);
  };

  useEffect(() => {
    if (isAuth) {
      setMyStrategiesLoading(true);
      getMyStrategies();
    }
  }, [isAuth]);

  return (
    <Box containerClass="min-h-[auto]" loading={myStrategiesLoading}>
      <div>
        <ul>
          {myStragegies.map((strategy: strategy_prop) => {
            return <li key={strategy.strategy_id}>{strategy.strategy_id}</li>;
          })}
        </ul>
      </div>
    </Box>
  );
};

export default MyStrategies;
