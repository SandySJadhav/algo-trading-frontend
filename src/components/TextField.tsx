"use client";

import Loader from "./Loader";
import classNames from "classnames";
import React, { ForwardedRef, forwardRef } from "react";
import { HiChevronDown, HiMagnifyingGlass } from "react-icons/hi2";

type Prop = {
  rows?: number;
  name?: string;
  id?: string;
  title?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: any;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  onFocus?: () => void;
  disabled?: boolean;
  isSearchable?: boolean;
  loading?: boolean;
};

const getErrorStatus = (error?: any) => {
  if (error === "Invalid" || error === "Required") return "true";
  return "";
};

const TextField = forwardRef(
  (
    {
      title,
      id,
      type = "text",
      name,
      placeholder,
      isSearchable = false,
      loading = false,
      error,
      ...props
    }: Prop,
    ref: ForwardedRef<any>
  ) => {
    const errorStatus = getErrorStatus(error);
    return (
      <label className="flex flex-col">
        {title ? (
          <span className="flex text-sm font-medium text-slate-700 mb-2 ml-1">
            {title}
          </span>
        ) : null}
        {isSearchable ? (
          <div className="relative flex items-center justify-start">
            <div className="flex absolute p-3 left-0">
              <HiMagnifyingGlass />
            </div>
            <input
              {...props}
              ref={ref}
              id={id}
              name={name}
              placeholder={placeholder}
              className={classNames(
                "flex w-full text-base py-4 px-10 bg-textboxbg text-textboxtext border rounded-md shadow-sm placeholder-textboxtext focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
                {
                  "border-pink-500 focus:ring-1 !ring-pink-500 focus:ring-ping-700 !focus:border-pink-700":
                    errorStatus,
                  "focus:border-sky-500 focus:ring-1 focus:ring-sky-500":
                    !errorStatus,
                }
              )}
            />
            {loading && (
              <div className="flex absolute p-3 right-6">
                <Loader className="h-4 w-4 p-0 m-0 -mt-1" />
              </div>
            )}
            <div className="flex absolute p-3 right-0">
              <HiChevronDown />
            </div>
          </div>
        ) : type !== "textarea" ? (
          <input
            {...props}
            ref={ref}
            id={id}
            name={name}
            placeholder={placeholder}
            className={classNames(
              "flex w-full text-base p-4 bg-textboxbg text-textboxtext border rounded-md shadow-sm placeholder-textboxtext focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
              {
                "border-pink-500 focus:ring-1 !ring-pink-500 focus:ring-ping-700 !focus:border-pink-700":
                  errorStatus,
                "focus:border-sky-500 focus:ring-1 focus:ring-sky-500":
                  !errorStatus,
              }
            )}
          />
        ) : (
          <textarea
            {...props}
            ref={ref}
            id={id}
            name={name}
            placeholder={placeholder}
            className={classNames(
              "flex w-full text-base p-4 bg-textboxbg text-textboxtext border rounded-md shadow-sm placeholder-textboxtext focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
              {
                "border-pink-500 focus:ring-1 !ring-pink-500 focus:ring-ping-700 !focus:border-pink-700":
                  errorStatus,
                "focus:border-sky-500 focus:ring-1 focus:ring-sky-500":
                  !errorStatus,
              }
            )}
          />
        )}
      </label>
    );
  }
);

TextField.displayName = "Textfield";

export default TextField;
