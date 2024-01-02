"use client";

import { setCustomer, setUserLoading } from "../redux/reducers/customer";
import { DropdownOption } from "../types";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import StoreWrapper from "./StoreWrapper";
import {
  MobileNavigationMenus,
  MobileUserMenus,
  NavigationMenus,
  UserMenus,
} from "@constants/Menu";
import Firebase from "@services/GoogleApp";
import classNames from "classnames";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiBars3, HiChevronDown } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

const NavigationWithDropdown = ({
  label,
  subMenus = [],
  url,
  icon,
}: DropdownOption) => {
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
  };

  const handleOnBlur = (e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setPanelOpen(false);
    }
  };

  const handleOnSelect = (selection: any) => {
    switch (selection.label) {
      case "Logout":
        signOut(Firebase.auth).catch((error) => {
          console.log("Failed to logout", error);
        });
        localStorage.clear();
        router.push("/login");
        return;

      default:
        if (selection.url) {
          router.push(selection.url);
        }
        console.log(selection);
        return;
    }
  };

  return (
    <div
      key={label}
      tabIndex={0}
      className="select-none p-4 text-master-gray hover:text-master-blue active:text-master-blue focus:text-master-blue cursor-pointer"
      onClick={handleNavItemClick}
      onKeyDown={(e) => e.key === "Enter" && handleNavItemClick()}
    >
      <div className="flex items-center justify-start h-full">
        {icon}
        <span
          className={classNames("min-w-10 text-center", {
            "ml-2": icon,
          })}
        >
          {label}
        </span>
        {subMenus?.length > 0 && <HiChevronDown className="inline ml-2" />}
      </div>
      {subMenus?.length > 0 && (
        <Dropdown
          options={subMenus}
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          ref={dropdownRef}
          onBlur={handleOnBlur}
          onSelect={handleOnSelect}
        />
      )}
    </div>
  );
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [floatHeader, setFloatHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuth, details } = useSelector((state: any) => state.customer);
  const { displayName, email } = details || {};

  const onScroll = useCallback(() => {
    if (window.scrollY > 9) {
      setFloatHeader(true);
    } else {
      setFloatHeader(false);
    }
  }, []);

  useEffect(() => {
    if (window.scrollY > 9) {
      setFloatHeader(true);
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    console.log("Checking session...");
    dispatch(setUserLoading(true));
    onAuthStateChanged(Firebase.auth, (user: any) => {
      if (!user && pathname !== "/login" && pathname !== "/register") {
        // no user login found
        router.push("/login");
        dispatch(setUserLoading(false));
      } else if (user) {
        // user found, set redux state
        dispatch(setCustomer(user));
        if (pathname === "/login" || pathname === "/register") {
          router.push("/");
        }
      } else {
        // New user on login or register page
        dispatch(setUserLoading(false));
      }
    });
  }, []);

  if (!isAuth || pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <header
      className={classNames("header", {
        "header-fixed": floatHeader,
      })}
    >
      <div className="px-5 md:px-20 lg:px-30 xl:px-40 2xl:px-96">
        <div className="h-[100px]">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <Image
                className="h-auto w-auto"
                alt="Logo"
                width={100}
                height={40}
                src={"/logo.jpg"}
                priority
              />
            </div>
            <div
              className="flex items-center md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <HiBars3 className="h-9 w-9" />
            </div>
            <div className="hidden md:flex items-center justify-between p-0">
              {NavigationMenus.map((menu) => (
                <NavigationWithDropdown key={menu.label} {...menu} />
              ))}
              <NavigationWithDropdown
                {...UserMenus}
                label={displayName || email}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="flex">
          <div className="flex flex-col w-1/2">
            {MobileNavigationMenus.map((menu) => (
              <NavigationWithDropdown key={menu.label} {...menu} />
            ))}
          </div>
          <div className="flex flex-col">
            <NavigationWithDropdown {...MobileUserMenus} />
          </div>
        </div>
      </Modal>
    </header>
  );
};

const HeaderWrapper = () => {
  return (
    <StoreWrapper>
      <Header />
    </StoreWrapper>
  );
};
export default HeaderWrapper;
