import React, { ReactNode, useEffect } from 'react';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineXMark } from 'react-icons/hi2';

type Props = {
    onClose: () => void,
    title?: string,
    open: boolean,
    children: ReactNode
}

const Modal = ({ title, open, children, onClose }: Props) => {

    useEffect(() => {
        if (open) {
            const element = document.getElementById("app-body");
            if (element && !element.classList.contains("hide-scroll")) {
                console.log("overflow: none");
                element.classList.add("hide-scroll");
            }
        }
    }, [open]);

    const handleModalClose = () => {
        onClose();
        setTimeout(() => {
            const element = document.getElementById("app-body");
            if (element) {
                console.log("overflow: auto");
                element.classList.remove("hide-scroll");
            }
        }, 100);
    }

    return (
        <AnimatePresence initial={false}>
            {open && (
                <div
                    role='dialog'
                    aria-modal='true'
                    aria-describedby='dialog_desc'
                    aria-labelledby='dialog_title'
                    className='fixed left-0 top-0 right-0 bottom-0 antialiased overflow-x-hidden z-50'
                >
                    <div
                        className={cx(
                            'px-4 h-screen md:flex md:items-center md:justify-center',
                        )}
                    >
                        <div
                            className={cx(
                                'bg-[#11182780] opacity-100 w-screen h-screen absolute z-9 inset-0',

                            )}
                            data-testid='modal-backdrop'
                        />
                        <motion.div
                            className="modal-open bg-white md:mx-auto p-4 fixed inset-x-0 z-11 m-1 rounded-md md:relative"
                            id="close"
                            tabIndex={1}
                            aria-hidden='true'
                            initial='close'
                            animate={open ? 'open' : 'close'}
                            exit='close'
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { type: 'spring', stiffness: 300, damping: 30 }
                                },
                                close: {
                                    opacity: 0,
                                    y: 100,
                                    transition: { type: 'spring', stiffness: 300, damping: 30 }
                                }
                            }}
                        >
                            <div className='p-4 bg-white'>
                                <div className='flex justify-between items-center text-black'>
                                    {
                                        title ? <h2
                                            id='dialog_title'
                                        >
                                            title
                                        </h2> : <span className='h-0 w-0' />
                                    }
                                    <button
                                        type='button'
                                        className='w-12 h-12 -mt-7 -mr-6 bg-transparent border-none cursor-pointer'
                                        data-modal-toggle="Close"
                                        aria-label="Close"
                                        onClick={handleModalClose}
                                    >
                                        <HiOutlineXMark className='h-10 w-10 p-1 m-1' />
                                        <span className='sr-only hidden'>Close modal</span>
                                    </button>
                                </div>

                                <div
                                    className={cx(
                                        'py-2 space-y-6 max-h-[100vh] w-full sm:h-auto overflow-y-auto overflow-x-hidden',
                                    )}
                                >
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};


export default Modal;
