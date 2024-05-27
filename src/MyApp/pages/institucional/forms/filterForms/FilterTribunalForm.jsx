import axiosInstance from "MyApp/utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function FilterTribunalForm({ formFilterObject }) {
  const [puestos, setPuestos] = useState([]);

  const clearFilters = (e) => {
    e.preventDefault();
    formFilterObject.setoffset(0);
    formFilterObject.setInput(undefined);
    formFilterObject.setEstado(undefined);
    formFilterObject.setOrden(undefined);
  };

  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    formFilterObject.setoffset(0);
    formFilterObject.setEstado(data.estado);
    formFilterObject.setInput(data.input);
    formFilterObject.setOrden(data.orden);
    formFilterObject.setPuesto(data.posicion);
  };
  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Row>
          <Col xl={2}>
            <Form.Group>
              <Form.Label>Nombre o apellido</Form.Label>
              <Form.Control name="input" />
            </Form.Group>
          </Col>
          <Col xl={2}>
            <Form.Group>
              <Form.Label>Orden</Form.Label>
              <Form.Control name="orden" type="number" />
            </Form.Group>
          </Col>
          <Col xl={2}>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado">
                <option value="">Todas</option>
                <option value={1}>Activas</option>
                <option value={0}>Inactivas</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xl={2}>
            <Form.Group>
              <Form.Label>Posicion</Form.Label>
              <Form.Select name="posicion">
                <option value={undefined}>Todas</option>
                <option value={"Titular"}>Titular</option>
                <option value={"Suplente"}>Suplente</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xl={2} className="mt-4">
            <Button variant="primary" className="w-100" type="submit">
              Enviar
            </Button>
          </Col>
          <Col xl={2} className="mt-4">
            <Button
              onClick={clearFilters}
              variant="secondary"
              className="w-100"
            >
              Limpiar filtros
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
