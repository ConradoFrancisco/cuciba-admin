import React from "react";

import PageHeader from "components/common/PageHeader";
import { Card, CardHeader, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const PrincipalPage = () => {
  return (
    <>
      <PageHeader
        title={"Administrador CUCICBA"}
        description={
          "Bienvenido al dashboard administrador del Colegio único de corredores inmobiliarios de la ciudad de Buenos Aires. Aquí podrás agregar noticias, darlas de baja, modificar servicios al matriculado y crear la inscripcion a los respectivos cursos."
        }
      />
      <Row className="mt-4">
        <Col xl={4}>
          <Card
            className="p-1"
            style={{
              backgroundImage:
                "url(http://localhost:3000/static/media/corner-4.62f4f1af.png)",
            }}
          >
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <CardHeader>
                <h4>Servicios</h4>
              </CardHeader>
              <Card.Body>
                <p>añade y </p>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xl={4}>
          <Card
            className="p-1"
            style={{
              backgroundImage:
                "url(http://localhost:3000/static/media/corner-4.62f4f1af.png)",
            }}
          >
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <CardHeader>
                <h4>Noticias</h4>
              </CardHeader>
              <Card.Body>
                <p>Enlace a la sección de noticias</p>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="p-1">asd</Card>
        </Col>
      </Row>
    </>
  );
};

export default PrincipalPage;
