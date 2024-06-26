import axiosInstance from "MyApp/utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function FilterPersonalform({ formFilterObject }) {
    const [areas,setAreas] = useState([])
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
    console.log(data)
    formFilterObject.setoffset(0);
    formFilterObject.setEstado(data.estado);
    formFilterObject.setInput(data.input);
    formFilterObject.setOrden(data.area);
  };
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/areas/select"
        );
        setAreas(response.data);
      } catch (e) {
        console.error("hubo un problema con la obtencion de datos");
      }
    };
    fetchAreas();
  }, []);
  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Row>
          <Col xl={3}>
            <Form.Group>
              <Form.Label>Buscador</Form.Label>
              <Form.Control name="input" />
            </Form.Group>
          </Col>
          <Col xl={3}>
            <Form.Group>
              <Form.Label>Área</Form.Label>
              <Form.Select
                name="area"
              >
              <option value={'-'}>-</option>
                {areas?.map((area)=>(
                    <option key={area.id} value={area.id}>{area.title}</option>
                ))}
              </Form.Select>
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
