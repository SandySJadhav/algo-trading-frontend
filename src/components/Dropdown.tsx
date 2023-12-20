import React, { ForwardedRef, SyntheticEvent, forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DropdownOption } from '../types';
import classNames from 'classnames';
import { LI_ANIMATION } from '@constants/animations';

type Props = {
    open: boolean,
    options?: DropdownOption[],
    onClose?: () => void,
    onBlur?: (e: SyntheticEvent) => void
}

const Dropdown = forwardRef(({ open, options, ...rest }: Props, ref?: ForwardedRef<any>) => {
    return (
        <AnimatePresence initial={false}>
            <motion.div
                initial={false}
                animate={open ? 'open' : 'closed'}
                className='flex relative'
            >
                <motion.ul
                    className={classNames(
                        'list-none',
                        'bg-white',
                        'custom-shadow',
                        'border-white border-2 border-solid',
                        'absolute',
                        'z-50',
                        'rounded',
                        'my-4',
                        'flex flex-col',
                        'pl-0',
                        {
                            'flex pointer-events-auto': open
                        },
                        {
                            'hidden pointer-events-none': !open
                        }
                    )}
                    role='list'
                    variants={LI_ANIMATION}
                    tabIndex={0}
                    ref={ref}
                    {...rest}
                >
                    <motion.div className='dropdown-menu-corner' />
                    {options?.map(option => {
                        return <motion.li
                            className='px-5 my-1 text-[#212529] flex-nowrap border-none font-normal clear-both w-full min-h-[20px] hover:text-master-blue focus:text-master-blue active:text-master-blue items-center '
                            tabIndex={0}
                            id={option.label}
                            key={option.label}
                        >
                            {
                                option.icon && <div>{option.icon}</div>
                            }
                            <div>{option.label}</div>
                        </motion.li>
                    })}
                </motion.ul>
            </motion.div>
        </AnimatePresence>
    );
});

Dropdown.displayName = "Dropdown";
export default Dropdown;