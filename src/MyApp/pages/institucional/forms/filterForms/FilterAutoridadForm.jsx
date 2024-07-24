import axiosInstance from "MyApp/utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function FilterAutoridadForm({ formFilterObject }) {
  const [puestos, setPuestos] = useState([]);

  const clearFilters = (e) => {
    const form = formRef.current;
    form.reset();
    e.preventDefault();
    
    formFilterObject.setoffset(0);
    formFilterObject.setEstado(undefined);
    formFilterObject.setInput(undefined);
    formFilterObject.setOrden(undefined);
    formFilterObject.setPuesto(undefined);
  };

  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data)
    formFilterObject.setoffset(0);
    formFilterObject.setEstado(data.estado);
    formFilterObject.setInput(data.input);
    formFilterObject.setOrden(data.orden);
    formFilterObject.setPuesto(data.puesto);
  };
  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/api/v1/institucional/autoridad/cargos"
        );
        console.log(response.data);
        setPuestos(response.data);
      } catch (e) {
        console.error("hubo un problema con la obtencion de datos");
      }
    };
    fetchPuestos();
  }, []);

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
                <option value={-1}>Todas</option>
                <option value={1}>Activas</option>
                <option value={0}>Inactivas</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xl={2}>
            <Form.Group>
              <Form.Label>Puesto</Form.Label>
              <Form.Select name="puesto">
                <option >Todas</option>
                {puestos?.map((puesto)=>(
                    <option value={puesto.id}>{puesto.nombre}</option>
                ))}
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
