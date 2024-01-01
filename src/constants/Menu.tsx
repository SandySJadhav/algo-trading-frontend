import {
  HiBell,
  HiDocumentCheck,
  HiEnvelope,
  HiKey,
  HiMiniWrenchScrewdriver,
  HiPower,
  HiUser,
  HiUserCircle,
} from "react-icons/hi2";

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
      },
      {
        label: "My Strategies",
      },
      {
        label: "Deployed",
      },
      {
        label: "Backtest",
      },
    ],
  },
  {
    label: "Services",
  },
  {
    label: "Reports",
  },
  {
    label: "User",
    icon: <HiUserCircle className="h-10 w-10" />,
    subMenus: [
      {
        label: "Profile",
        icon: <HiUser />,
      },
      {
        label: "Subscriptions",
        icon: <HiEnvelope />,
      },
      {
        label: "Notifications",
        icon: <HiBell />,
      },
      {
        label: "Invoices",
        icon: <HiDocumentCheck />,
      },
      {
        label: "Change Password",
        icon: <HiKey />,
      },
      {
        label: "Help & Support",
        icon: <HiMiniWrenchScrewdriver />,
      },
      {
        label: "Logout",
        icon: <HiPower />,
      },
    ],
  },
];
