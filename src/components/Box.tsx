import Loader from './Loader';
import classNames from 'classnames';
import { ReactNode } from 'react';

type Prop = {
  children: ReactNode;
  title?: string;
  containerClass?: string;
  loading?: boolean;
};

const Box = ({ title, children, containerClass, loading }: Prop) => {
  if (loading) {
    return (
      <div
        className={classNames(
          'shadow-master-2 rounded-lg p-10 my-6 overflow-y-auto',
          containerClass
        )}
      >
        <div className="flex flex-col text-center self-center items-center">
          <Loader className='h-14 w-14'/>
        </div>
      </div>
    );
  }
  return (
    <div
      className={classNames(
        'shadow-master-2 rounded-lg min-h-96 p-10 my-6 overflow-y-auto',
        containerClass
      )}
    >
      <h3 className="font-normal">{title}</h3>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default Box;
