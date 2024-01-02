"use client";

import cx from "classnames";
import React, { ReactNode, useRef } from "react";
import { HiChevronDown } from "react-icons/hi2";

type Prop = {
  children: ReactNode;
  name?: string;
  title?: string;
  error?: string;
};

const ReactSelect = ({ children, name, title, error, ...rest }: Prop) => {
  const ref = useRef<any>();
  const selectClassName = cx(
    "flex relative z-[2] w-full bg-transparent appearance-none text-base text-slate-700 p-4 bg-textboxbg text-textboxtext border rounded-md shadow-sm placeholder-textboxtext focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
    {
      "border border-red-600 focus:border-red-600 focus:ring-red-600": error,
      "focus:border-primary": !error,
    }
  );

  const containerClasses = cx("relative w-full");
  const labelClass = cx(
    "`z-0",
    "px-2",
    "absolute",
    "text-base",
    "dp-sm-text-label",
    "text-gray-500",
    "duration-300",
    "transform",
    "scale-58",

    "peer-valid:bg-red",
    // 'peer-focus:top-[29%]',
    "origin-[0]",
    "left-2",
    "peer-placeholder-shown:scale-100",
    "-translate-y-4",
    "peer-placeholder-shown:translate-y-0",
    "peer-focus:scale-75",
    "peer-focus:-translate-y-4",
    "peer-valid:-translate-y-4"
  );

  return (
    <div className={containerClasses}>
      <select
        ref={ref}
        data-testid="select"
        id={name}
        title={name}
        name={name}
        className={selectClassName}
        {...rest}
      >
        {children}
      </select>

      <div className="absolute top-0 right-5 h-full w-6 justify-center flex flex-col items-center">
        <HiChevronDown className="h-6 w-6 flex" />
      </div>

      {title && (
        <label htmlFor={name} className={labelClass}>
          {title}
        </label>
      )}
      {error && (
        <span className="text-danger text-sm mt-2 block">Required</span>
      )}
    </div>
  );
};

ReactSelect.displayName = "Select";

export default ReactSelect;
