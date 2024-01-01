import React from "react";
import classNames from "classnames";

type Prop = {
  children?: any,
  className?: string,
  variant?: string
  onClick?: () => void,
  name?: string,
  icon?: any,
  type?: 'submit' | 'reset' | 'button'
}

const Button = ({ children, className, variant, icon, type = 'button',...props }: Prop) => {
  const primary = variant === "primary";
  const secondary = variant === "secondary";
  const danger = variant === "danger";
  const link = variant === "link";

  const buttonClasses = classNames(
    "uppercase",
    "cursor-pointer",
    "text-sm",
    "rounded-lg",
    "flex",
    "shadow-none",
    "transition",
    "ease-in-out",
    "duration-150",
    "p-4",
    {
      "bg-master-blue text-white hover:shadow-xl active:shadow-xl focus:shadow-xl": primary,
    },
    {
      "bg-white text-master-blue border hover:shadow-sm active:shadow-sm focus:shadow-sm": secondary,
    },
    {
      "bg-danger text-white hover:shadow-xl active:shadow-xl focus:shadow-xl": danger,
    },
    {
      "text-master-blue dark:bg-base bg-white border-none hover:shadow-none hover:underline":
        link,
    },
    {
      "justify-around": !icon,
      "items-center": icon
    },
    className
  );
  return (
    <button {...props} className={buttonClasses} type={type}>
      <div className="flex">{children}</div>
      {icon && <div className="flex ml-2 text-2xl">{icon}</div>}
    </button>
  );
};

export default Button;
