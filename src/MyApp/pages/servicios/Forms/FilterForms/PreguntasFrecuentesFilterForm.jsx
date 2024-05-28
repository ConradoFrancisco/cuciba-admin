import axiosInstance from "MyApp/utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import PreguntasFrecuentesService from "services/servicios/PreguntasFrecuentesService";

export default function PreguntasFrecuentesFilterForm({ formFilterObject }) {
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
    formFilterObject.setPuesto(data.categoria);
    /* formFilterObject.setcategoria(data.categoria) */
  };
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await PreguntasFrecuentesService.getCategorys();
        console.log(response.data);
        setPuestos(response.data);
      } catch (e) {
        console.error("hubo un problema con la obtencion de datos");
      }
    };
    fetchCategorias();
  }, []);

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Row>
          <Col xl={4}>
            <Form.Group>
              <Form.Label>Pregunta</Form.Label>
              <Form.Control name="input" />
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
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoria">
                <option value={undefined}>Todas</option>
                {puestos?.map((puesto)=>(
                    <option value={puesto.id}>{puesto.titulo}</option>
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
