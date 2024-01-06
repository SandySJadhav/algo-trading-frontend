"use client";

import Box from "@components/Box";
import ReactTimePicker from "@components/ReactTimePicker";
import Search from "@components/Search";
import TextField from "@components/TextField";

const CreateStrategy = () => {
  const handleInstrumentSelect = (option: any) => {
    // user selected instrument
    console.log(option);
  };

  return (
    <div className="relative px-5 md:px-20 lg:px-30 xl:px-40 2xl:px-96 pt-[120px]">
      <h2 className="text-center font-bold text-3xl pb-5">Create Strategy</h2>
      <Box title="Basic Info">
        <div className="mt-4 w-full md:w-1/2">
          <TextField
            id="name"
            placeholder="Eg. 10AM strategy"
            title="Name"
            name="name"
          />
        </div>
        <div className="mt-4 w-full">
          <TextField
            id="description"
            type="textarea"
            placeholder="Eg. 10AM strategy"
            title="Description"
            name="description"
            rows={4}
          />
        </div>
      </Box>
      <Box title="Trading Setup" containerClass="min-h-[500px]">
        <div className="flex space-x-3">
          <div className="mt-4 w-full md:w-1/2">
            <Search onSelect={handleInstrumentSelect} />
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
        <div className="custom_hr">
          <p>AND</p>
        </div>
        <div className="flex space-x-3">
          <div className="w-full md:w-1/2">
            <ReactTimePicker title="EntryAt" />
          </div>
          <div className="w-full md:w-1/2">
            <ReactTimePicker title="ExitAt" />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CreateStrategy;
