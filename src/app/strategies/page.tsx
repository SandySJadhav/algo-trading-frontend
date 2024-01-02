import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Strategies | Algo - To the future",
  description: "Algo - To the future",
};

const MyStrategies = () => {
  return (
    <div className="relative px-5 md:px-20 lg:px-30 xl:px-40 2xl:px-96 pt-[120px]">
      <h2 className="text-center font-bold text-3xl pb-5">My Strategies</h2>
    </div>
  );
};

export default MyStrategies;
