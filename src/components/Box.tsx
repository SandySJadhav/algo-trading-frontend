import classNames from "classnames";
import { ReactNode } from "react";

type Prop = {
  children: ReactNode;
  title?: string;
  containerClass?: string;
};

const Box = ({ title, children, containerClass }: Prop) => {
  return (
    <div
      className={classNames(
        "shadow-master-2 rounded-lg min-h-96 p-10 my-6 overflow-y-auto",
        containerClass
      )}
    >
      <h3 className="font-normal">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Box;
