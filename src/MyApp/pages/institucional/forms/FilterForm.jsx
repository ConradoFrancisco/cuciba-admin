import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function Filterform({ formFilterObject }) {
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
    formFilterObject.setInput(data.titulo);
    formFilterObject.setOrden(data.orden);
  };
  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Row>
          <Col xl={3}>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control name="titulo" />
            </Form.Group>
          </Col>
          <Col xl={3}>
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
