import MyStrategies from '@components/MyStretegies';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Strategies | Algo - To the future',
  description: 'Algo - To the future'
};

const Strategies = () => {
  return (
    <div className="relative px-5 md:px-20 lg:px-30 xl:px-40 2xl:px-96 pt-[120px]">
      <h2 className="text-center font-bold text-3xl pb-5">My Strategy</h2>
      <MyStrategies />
    </div>
  );
};

export default Strategies;
