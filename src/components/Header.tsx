"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiBars3, HiChevronDown } from "react-icons/hi2";
import classNames from "classnames";
import Modal from "./Modal";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { DropdownOption } from "../types";
import { NavigationMenus, UserMenus } from "@constants/Menu";

const NavigationWithDropdown = ({ label, subMenus = [] }: DropdownOption) => {
    const [panelOpen, setPanelOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>();

    const handleNavItemClick = () => {
        if (subMenus?.length > 0) {
            // open submenu panel
            if (!panelOpen) {
                setTimeout(() => {
                    dropdownRef.current?.focus();
                }, 10);
            }
            setPanelOpen(!panelOpen);
        } else {
            // redirect to this link

        }
    }

    const handleOnBlur = (e: any) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setPanelOpen(false)
        }
    }

    return <div
        key={label}
        className="select-none p-4 hover:text-master-blue cursor-pointer"
        onClick={handleNavItemClick}
    >
        <div className="flex items-center justify-between h-full">
            <span>{label}</span>
            {subMenus?.length > 0 && <HiChevronDown className="inline ml-2" />}
        </div>
        {
            subMenus?.length > 0 &&
            <Dropdown
                options={subMenus}
                open={panelOpen}
                onClose={() => setPanelOpen(false)}
                ref={dropdownRef}
                onBlur={handleOnBlur}
            />
        }
    </div>
}

const Header = () => {
    const [floatHeader, setFloatHeader] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const onScroll = useCallback(() => {
        if (window.scrollY > 9) {
            setFloatHeader(true);
        } else {
            setFloatHeader(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [onScroll]);

    return (
        <header className={classNames("header", {
            'header-fixed': floatHeader
        })}>
            <div className="container">
                <div className="h-[100px]">
                    <div className="flex items-center justify-between h-full">
                        <div className="flex items-center">
                            <Image
                                className="h-auto w-auto"
                                alt="Logo"
                                width={100}
                                height={40}
                                src={"/logo.jpg"}
                            />
                        </div>
                        <div className="flex items-center md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                            <HiBars3 className="h-9 w-9" />
                        </div>
                        <div className="hidden md:flex items-center justify-center p-0">
                            {NavigationMenus.map(menu => <NavigationWithDropdown key={menu.label} {...menu} />)}
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={menuOpen} onClose={() => setMenuOpen(false)}>
                {UserMenus.map(menu => <NavigationWithDropdown key={menu.label} {...menu} />)}
            </Modal>
        </header>
    );
};

export default Header;
