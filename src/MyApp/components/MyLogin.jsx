import React from "react";
import { Link } from "react-router-dom";
import Flex from "components/common/Flex";
import MyLoginForm from "./MyLoginForm";

const MyLogin = () => (
  <>
    <Flex justifyContent="between" alignItems="center" className="mb-2">
      <h5>Iniciar Sesión</h5>
      <p className="fs--1 text-600 mb-0">
        o <Link to="/authentication/simple/register">Crear una cuenta</Link>
      </p>
    </Flex>
    <MyLoginForm />
  </>
);

export default MyLogin;
