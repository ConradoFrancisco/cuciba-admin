import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import classNames from "classnames";
import AppContext from "context/Context";
import Logo from "components/common/Logo";
import SearchBox from "./SearchBox";
import NavbarTopDropDownMenus from "./NavbarTopDropDownMenus";
import { navbarBreakPoint, topNavbarBreakpoint } from "config";
import autoCompleteInitialItem from "data/autocomplete/autocomplete";
import TopNavRightSideNavItem from "./TopNavRightSideNavItem";
import { useLocation } from "react-router";

const NavbarTop = () => {
  const {
    config: { showBurgerMenu, navbarPosition, navbarCollapsed },
    setConfig,
  } = useContext(AppContext);

  const { pathname } = useLocation();
  const isChat = pathname.includes("chat");

  const [showDropShadow, setShowDropShadow] = useState(false);

  const handleBurgerMenu = () => {
    navbarPosition === "top" && setConfig("navbarCollapsed", !navbarCollapsed);
    (navbarPosition === "top" || navbarPosition === "combo") &&
      setConfig("showBurgerMenu", !showBurgerMenu);
  };

  const setDropShadow = () => {
    const el = document.documentElement;
    if (el.scrollTop > 0) {
      setShowDropShadow(true);
    } else {
      setShowDropShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setDropShadow);
    return () => window.removeEventListener("scroll", setDropShadow);
  }, []);

  return (
    <Navbar
      className={classNames("navbar-glass  fs--1 navbar-top sticky-kit", {
        // 'navbar-glass-shadow': showDropShadow
        "navbar-glass-shadow": showDropShadow && !isChat,
      })}
      expand={true ? topNavbarBreakpoint : true}
    >
      <Logo at="navbar-top" width={40} id="topLogo" />

      <Navbar.Collapse in={navbarCollapsed} className="scrollbar pb-3 pb-lg-0">
        <Nav navbar>
          <NavbarTopDropDownMenus />
        </Nav>
      </Navbar.Collapse>

      <TopNavRightSideNavItem />
    </Navbar>
  );
};

export default NavbarTop;
