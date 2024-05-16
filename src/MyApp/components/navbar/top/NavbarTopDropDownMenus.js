import React from "react";
import NavbarDropdown from "./NavbarDropdown";

import { Dropdown, NavDropdown, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import MyRoutesScheme from "MyApp/routes/MyRoutesScheme";

const NavbarTopDropDownMenus = () => {
  return (
    <>
      {MyRoutesScheme.map((router, key) => {
        return (
          <NavbarDropdown key={key} title={router.label}>
            {router.children[0].children.map((route) => (
              <Dropdown.Item
                style={{ width: "100%" }}
                key={route.name}
                as={Link}
                className={route.active ? "link-600" : "text-500"}
                to={route.to}
              >
                {route.name}
              </Dropdown.Item>
            ))}
          </NavbarDropdown>
        );
      })}
      <div>
        <NavItem
          className="nav-link fw-semi-bold"
          as={Link}
          to={"/noticias/listar"}
        >
          Noticias
        </NavItem>
      </div>
    </>
  );
};

export default NavbarTopDropDownMenus;
