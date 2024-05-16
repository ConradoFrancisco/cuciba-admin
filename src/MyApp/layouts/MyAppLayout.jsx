import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarTop from "MyApp/components/navbar/top/NavbarTop";
import UsersService from "MyApp/data/UsersService";

const MyAppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = UsersService.CheckUserLogged();
    if (!user) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <main>
      <Container fluid>
        <div className="content">
          <NavbarTop />
          <Outlet />
        </div>
      </Container>
    </main>
  );
};
export default MyAppLayout;
