import Box from "@components/Box";
import TextField from "@components/TextField";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Strategy | Algo - To the future",
  description: "Algo - To the future",
};

const CreateStrategy = () => {
  return (
    <div className="relative px-20 lg:px-30 xl:px-40 2xl:px-96 pt-[120px]">
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
    </div>
  );
};

export default CreateStrategy;
