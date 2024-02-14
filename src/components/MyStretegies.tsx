'use client';

import { debounce } from '../utils';
import Box from './Box';
import Loader from './Loader';
import ToggleSwitch from './ToggleSwitch';
import {
  getMyStrategiesAction,
  updateStrategyAction
} from '@actions/strategies';
import { strategy_prop } from '@mytypes/strategy';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyStrategies = () => {
  const [myStrategiesLoading, setMyStrategiesLoading] = useState(false);
  const [myStragegies, setMyStrategies] = useState([]);
  const { isAuth } = useSelector((state: any) => state.customer);

  const handleStrategyStatusToggle = useCallback(
    debounce(async (id: string, status: boolean) => {
      console.log('🚀 Update toggle ', id, status);
      updateStrategyAction(id, { status });
    }, 700),
    []
  );

  const getMyStrategies = async () => {
    const allStrategies = await getMyStrategiesAction();
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
    <div>
      {myStrategiesLoading && (
        <Box containerClass="min-h-[auto] justify-center content-center flex">
          <Loader />
        </Box>
      )}
      <ul>
        {myStragegies.map((strategy: strategy_prop) => (
          <li key={strategy.strategy_id}>
            <Box containerClass="min-h-[auto]" title={strategy.strategy_id}>
              <div className="flex content-center">
                <div className="flex">Timeframe:</div>
                <div className="flex">{strategy.candle_timeframe}</div>
              </div>
              <ToggleSwitch
                strategyId={strategy.strategy_id}
                title={strategy.status}
                checked={strategy.status === 'ACTIVE'}
                onChange={handleStrategyStatusToggle}
              />
            </Box>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyStrategies;
