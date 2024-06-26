import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import team3 from "assets/img/team/3.jpg";
import Avatar from "components/common/Avatar";

const ProfileDropdown = () => {
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={team3} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Item as={Link} to="/user/profile">
            Perfil
          </Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/user/settings">
            Ajustes
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/authentication/card/logout">
            Cerrar sesión
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
