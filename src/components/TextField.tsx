import classNames from "classnames";
import React, { ForwardedRef, forwardRef } from "react";

type Prop = {
  name?: string,
  id?: string,
  title?: string,
  type?: string,
  placeholder?: string,
  value?: string,
  error?: any,
  onChange?: (e: any) => void
}

const getErrorStatus = (error?: any) => {
  if (error === "Invalid" || error === "Required") return "true";
  return "";
}

const TextField = forwardRef(({
  title,
  id,
  name,
  onChange = (e) => { },
  value,
  placeholder,
  error,
  ...props
}: Prop, ref: ForwardedRef<HTMLInputElement>) => {
  const errorStatus = getErrorStatus(error);
  return (
    <div>
      <label className="flex">
        {title ? (
          <span className="flex text-sm font-medium text-slate-700">{title}</span>
        ) : null}
        <input
          {...props}
          ref={ref}
          id={id ?? name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={classNames("flex w-full text-base p-4 bg-textboxbg text-textboxtext border rounded-md shadow-sm placeholder-textboxtext focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none", {
            'border-pink-500 focus:ring-1 !ring-pink-500 focus:ring-ping-700 !focus:border-pink-700': errorStatus,
            'focus:border-sky-500 focus:ring-1 focus:ring-sky-500': !errorStatus
          })}
        />

      </label>
    </div>
  );
});

TextField.displayName = "Textfield";

export default TextField;
