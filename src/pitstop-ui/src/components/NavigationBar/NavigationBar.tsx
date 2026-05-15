import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGasPump,
  faChartLine,
  faCar,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Sidebar } from "primereact/sidebar";
import { useAuth } from "../../context";

interface NavigationBarProps {
  brand?: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ brand }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { isAuthenticated, user, login, logout } = useAuth();
  const userName = user?.name;
  const menuRef = useRef<Menu>(null);

  const navItems = [
    {
      label: "Dashboard",
      icon: <FontAwesomeIcon icon={faHome} className="mr-2" />,
      command: () => {
        window.location.href = "/";
      },
    },
    {
      label: "Fill-Ups",
      icon: <FontAwesomeIcon icon={faGasPump} className="mr-2" />,
      command: () => {
        window.location.href = "/fill-ups";
      },
    },
    {
      label: "Analytics",
      icon: <FontAwesomeIcon icon={faChartLine} className="mr-2" />,
      command: () => {
        window.location.href = "/analytics";
      },
    },
    {
      label: "Vehicles",
      icon: <FontAwesomeIcon icon={faCar} className="mr-2" />,
      command: () => {
        window.location.href = "/vehicles";
      },
    },
  ];

  const authMenuItems = isAuthenticated
    ? [
        {
          label: userName ?? "Account",
          icon: "pi pi-user",
          disabled: true,
        },
        { separator: true },
        {
          label: "Sign out",
          icon: "pi pi-sign-out",
          command: logout,
        },
      ]
    : [
        {
          label: "Sign in",
          icon: "pi pi-sign-in",
          command: login,
        },
      ];

  const brandTemplate = (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faGasPump} className="text-accent text-xl" />
      <span className="text-xl font-bold text-secondary">
        {brand ?? "PitStop"}
      </span>
    </div>
  );

  const endTemplate = (
    <div className="flex items-center">
      <Button
        icon={<FontAwesomeIcon icon={faUser} />}
        className="p-button-text p-button-plain"
        onClick={(e) => menuRef.current?.toggle(e)}
        tooltip={isAuthenticated ? (userName ?? "Account") : "Sign in"}
        tooltipOptions={{ position: "bottom" }}
        aria-label="User menu"
      />
      <Menu model={authMenuItems} popup ref={menuRef} className="w-48" />
    </div>
  );

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden md:block">
        <Menubar model={navItems} start={brandTemplate} end={endTemplate} />
      </div>

      {/* Mobile nav */}
      <div className="md:hidden">
        <div className="p-menubar p-component flex items-center justify-between px-4 py-2">
          {brandTemplate}
          <Button
            icon={<FontAwesomeIcon icon={faBars} />}
            className="p-button-text p-button-plain"
            onClick={() => setSidebarVisible(true)}
            aria-label="Open menu"
          />
        </div>
      </div>

      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="right"
        className="w-72"
      >
        <div className="space-y-1 pt-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-left bg-transparent border-none cursor-pointer text-sm font-medium"
              onClick={() => {
                item.command();
                setSidebarVisible(false);
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <hr className="my-3" />
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 text-sm text-gray-500 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                {userName}
              </div>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-left bg-transparent border-none cursor-pointer text-sm font-medium text-danger"
                onClick={() => {
                  logout();
                  setSidebarVisible(false);
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-left bg-transparent border-none cursor-pointer text-sm font-medium text-primary"
              onClick={() => {
                login();
                setSidebarVisible(false);
              }}
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              Sign in
            </button>
          )}
        </div>
      </Sidebar>
    </>
  );
};
