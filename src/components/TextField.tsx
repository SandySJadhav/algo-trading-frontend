import React from "react";
type Prop = {
  title?: string,
  type?: string,
  placeholder?: string,
  value?: string,
  onChange?: (val: string) => void
}
const TextField = ({ title, onChange, ...props }: Prop) => {
  return (
    <label className="flex">
      {title ? (
        <span className="flex text-sm font-medium text-slate-700">{title}</span>
      ) : null}
      <input
        {...props}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex w-full text-base p-4 bg-textboxbg text-textboxtext border rounded-md shadow-sm placeholder-textboxtext focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      />
    </label>
  );
};

export default TextField;
