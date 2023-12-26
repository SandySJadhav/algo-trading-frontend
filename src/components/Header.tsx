"use client"
import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { HiBars3, HiChevronDown } from "react-icons/hi2";
import classNames from "classnames";
import Modal from "./Modal";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { DropdownOption } from "../types";
import { NavigationMenus } from "@constants/Menu";
import { useRouter } from "next/navigation";

const NavigationWithDropdown = ({ label, subMenus = [], url, icon }: DropdownOption) => {
    const router = useRouter();
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
        } else if (url) {
            if (url.indexOf("http") === -1) {
                // redirect to this link
                router.push(url);
            } else {
                // external site url
                window.open(url, "_blank");
            }
        }
    }

    const handleOnBlur = (e: any) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setPanelOpen(false)
        }
    }

    return <div
        key={label}
        tabIndex={0}
        className="select-none p-4 hover:text-master-blue active:text-master-blue focus:text-master-blue cursor-pointer"
        onClick={handleNavItemClick}
        onKeyDown={e => e.key === 'Enter' && handleNavItemClick()}
    >
        <div className="flex items-center justify-start h-full">
            {icon}
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
            <div className="px-20 lg:px-30 xl:px-40">
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
                {NavigationMenus.map(menu => <NavigationWithDropdown key={menu.label} {...menu} />)}
            </Modal>
        </header>
    );
};

export default Header;
