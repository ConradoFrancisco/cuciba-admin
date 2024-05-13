import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Row, Col } from "react-bootstrap";
import UsersService from "MyApp/data/UsersService";
import { useNavigate } from "react-router-dom";
import { useUser } from "MyApp/context/AuthProvider";

const MyLoginForm = ({ hasLabel, layout }) => {
  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const history = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  // Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await UsersService.GetUser(
        formData.email,
        formData.password
      );
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(`Logueado como ${response.user.email}`, {
          theme: "colored",
        });
        setUser(response.user);
        history("/");
      } else {
        toast.error("hubo un erro al iniciar sesión");
      }
    } catch (e) {
      toast.error("hubo un erro al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "Email address" : ""}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "Password" : ""}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remember: e.target.checked,
                })
              }
            />
            <Form.Check.Label className="mb-0">Recordarme</Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/authentication/${layout}/forgot-password`}
          >
            Recuperar contraseña
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          Iniciar sesión
        </Button>
      </Form.Group>
    </Form>
  );
};

MyLoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool,
};

MyLoginForm.defaultProps = {
  layout: "simple",
  hasLabel: false,
};

export default MyLoginForm;
