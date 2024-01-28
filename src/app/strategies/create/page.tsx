"use client";

import Box from "@components/Box";
import ReactTimePicker from "@components/ReactTimePicker";
import Search from "@components/Search";
import TextField from "@components/TextField";
import { useState } from "react";

const CreateStrategy = () => {
  const [setup, setSetup] = useState<any>({});

  return (
    <div className="relative px-5 md:px-20 lg:px-30 xl:px-40 2xl:px-96 pt-[120px]">
      <h2 className="text-center font-bold text-3xl pb-5">Create Strategy</h2>
      <Box title="Basic Info" containerClass="min-h-[auto]">
        <div className="flex space-x-3">
          <div className="mt-4 w-full md:w-1/2">
            <TextField
              id="name"
              placeholder="Eg. 10AM strategy"
              title="Strategy Name"
              name="name"
            />
          </div>
          <div className="mt-4 w-full md:w-1/2">
            <TextField
              name="Strategy"
              id="Strategy"
              title="Strategy Type"
              value="Intraday"
              disabled
            />
          </div>
        </div>
      </Box>
      <Box title="Trading Setup" containerClass="">
        <div className="flex space-x-3">
          <div className="mt-4 w-full md:w-1/2">
            <Search
              onSelect={(instrument) => setSetup({ ...setup, instrument })}
              selection={setup.instrument}
            />
          </div>
          <div className="mt-4 w-full md:w-1/2">
            <TextField
              name="timeframe"
              id="timeframe"
              title="Timeframe"
              value="1 HOUR"
              disabled
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex space-x-3 mt-4">
            <div className="flex w-full md:w-1/2">
              <ReactTimePicker title="Entry After" />
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="mt-4 w-full md:w-1/2">Previous candle</div>
        </div>
      </Box>
    </div>
  );
};

export default CreateStrategy;
