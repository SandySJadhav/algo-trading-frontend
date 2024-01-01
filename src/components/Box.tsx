import { ReactNode } from "react";

const Box = ({ title, children }: { children: ReactNode; title?: string }) => {
  return (
    <div className="shadow-master-2 rounded-lg min-h-96 p-10">
      <h3 className="font-normal">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Box;
