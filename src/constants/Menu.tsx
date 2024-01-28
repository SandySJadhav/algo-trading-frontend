import { HiMiniUser, HiPower, HiUser } from "react-icons/hi2";

export const MobileNavigationMenus = [
  {
    label: "Dashboard",
    url: "/",
  },
  {
    label: "Strategies",
    subMenus: [
      {
        label: "Create",
        url: "/strategies/create",
      },
      {
        label: "My Strategies",
        url: "/strategies",
      },
      // {
      //   label: "Deployed",
      // },
      // {
      //   label: "Backtest",
      // },
    ],
  },
];

export const NavigationMenus = [
  {
    label: "Dashboard",
    url: "/",
  },
  {
    label: "Strategies",
    subMenus: [
      {
        label: "Create",
        url: "/strategies/create",
      },
      {
        label: "My Strategies",
        url: "/strategies",
      },
      // {
      //   label: "Deployed",
      // },
      // {
      //   label: "Backtest",
      // },
    ],
  },
];

export const UserMenus = {
  label: "User",
  icon: <HiMiniUser className="h-6 w-6" />,
  subMenus: [
    {
      label: "Profile",
      icon: <HiUser />,
      url: "/profile",
    },
    {
      label: "Logout",
      icon: <HiPower />,
    },
  ],
};

export const MobileUserMenus = {
  label: "User",
  icon: <HiMiniUser className="h-6 w-6" />,
  subMenus: [
    {
      label: "Profile",
      icon: <HiUser />,
      url: "/profile",
    },
    {
      label: "Logout",
      icon: <HiPower />,
    },
  ],
};
