import React, { useContext } from "react";
import { Nav, Dropdown, Button, NavDropdown } from "react-bootstrap";
import AppContext from "context/Context";
import { useUser } from "MyApp/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import UsersService from "MyApp/data/UsersService";

const TopNavRightSideNavItem = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const handleLogout = () => {
    UsersService.Logout();
    navigate("/auth/login");
  };

  if (!user) {
    return null;
  }

  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center"
      as="ul"
    >
      <NavDropdown title={`Bienvenido/a ${user.name}`}>
        <Dropdown.Item as={Button} onClick={handleLogout}>
          Cerrar Sesión
        </Dropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default TopNavRightSideNavItem;
