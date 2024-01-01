import { DropdownOption } from "../types";
import { LI_ANIMATION } from "@constants/animations";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { ForwardedRef, SyntheticEvent, forwardRef } from "react";

type Props = {
  open: boolean;
  options?: DropdownOption[];
  onClose?: () => void;
  onBlur?: (e: SyntheticEvent) => void;
  classes?: any;
  onSelect?: (option: any) => void;
};

const Dropdown = forwardRef(
  (
    { open, options, classes = {}, onSelect, ...rest }: Props,
    ref?: ForwardedRef<any>
  ) => {
    return (
      <AnimatePresence initial={false}>
        <motion.div
          initial={false}
          animate={open ? "open" : "closed"}
          className="flex relative"
        >
          <motion.ul
            className={classNames(
              "list-none",
              "bg-white",
              "custom-shadow",
              "border-white border-2 border-solid",
              "absolute",
              "z-50",
              "rounded",
              "my-4",
              "flex flex-col",
              "pl-0",
              {
                "flex pointer-events-auto": open,
              },
              {
                "hidden pointer-events-none": !open,
              },
              classes.ul
            )}
            role="list"
            variants={LI_ANIMATION}
            tabIndex={0}
            ref={ref}
            {...rest}
          >
            <motion.div
              className={classNames("dropdown-menu-corner", classes.corner)}
            />
            {options?.map((option) => {
              return (
                <motion.li
                  className={classNames(
                    "px-5 my-2 text-[#212529] flex flex-nowrap border-none font-normal clear-both w-full min-h-[20px] hover:text-master-blue focus:text-master-blue active:text-master-blue items-center",
                    classes.li
                  )}
                  tabIndex={0}
                  id={option.label}
                  key={option.label}
                  onClick={() => onSelect?.(option)}
                >
                  {option.icon && <div className="w-7">{option.icon}</div>}
                  <div className="whitespace-nowrap">{option.label}</div>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      </AnimatePresence>
    );
  }
);

Dropdown.displayName = "Dropdown";
export default Dropdown;
