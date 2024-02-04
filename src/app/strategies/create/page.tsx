'use client';

import Box from '@components/Box';
import ReactTimePicker from '@components/ReactTimePicker';
import Search from '@components/Search';
import TextField from '@components/TextField';
import { useState } from 'react';

const CreateStrategy = () => {
  const [setup, setSetup] = useState<any>({});

  return (
    <div className="relative px-5 md:px-20 lg:px-30 xl:px-40 2xl:px-96 pt-[120px]">
      <h2 className="text-center font-bold text-3xl pb-5">Create Strategy</h2>
      <Box title="Basic Info" containerClass="min-h-[auto]">
        <div className="sm:flex">
          <div className="w-full mb-4 sm:w-1/2 md:mr-3">
            <div className="relative">
              <TextField
                id="name"
                placeholder="Eg. 10AM strategy"
                title="Strategy Name"
                name="name"
              />
            </div>
          </div>
          <div className="w-full mb-4 sm:w-1/2">
            <div className="relative">
              <TextField
                name="Strategy"
                id="Strategy"
                title="Strategy Type"
                value="Intraday"
                disabled
              />
            </div>
          </div>
        </div>
      </Box>
      <Box title="Trading Setup" containerClass="">
        <div className="sm:flex">
          <div className="w-full mb-4 sm:w-1/2 md:mr-3">
            <div className="relative">
              <Search
                onSelect={(instrument) => setSetup({ ...setup, instrument })}
                selection={setup.instrument}
              />
            </div>
          </div>
          <div className="w-full mb-4 sm:w-1/2">
            <div className="relative">
              <TextField
                name="timeframe"
                id="timeframe"
                title="Timeframe"
                value="1 HOUR"
              />
            </div>
          </div>
        </div>
        <div className="sm:flex">
          <div className="w-full mb-4 sm:w-1/2 md:mr-3">
            <div className="relative">
              <ReactTimePicker title="Entry After" />
            </div>
          </div>
          <div className="w-full mb-4 sm:w-1/2">
            <div className="relative">
              <ReactTimePicker title="Stop Entry After" />
            </div>
          </div>
        </div>
        <div className="sm:flex">
          <div className="w-full mb-4 sm:w-1/2 md:mr-3">
            <div className="relative">
              <TextField
                type="number"
                name="maxEntries"
                id="maxEntries"
                title="Max entries per day"
              />
            </div>
          </div>
          <div className="w-full mb-4 sm:w-1/2 md:mr-3">
            <div className="relative">
              <TextField
                type="number"
                name="trailingsl"
                id="trailingsl"
                title="Trailing stop loss"
              />
            </div>
          </div>
          <div className="w-full mb-4 sm:w-1/2 md:mr-3">
            <div className="relative">
              <TextField
                type="number"
                name="buffer"
                id="buffer"
                title="Offset / Buffer"
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CreateStrategy;
