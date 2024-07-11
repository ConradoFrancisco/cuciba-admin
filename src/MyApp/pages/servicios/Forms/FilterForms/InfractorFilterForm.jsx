import axiosInstance from "MyApp/utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import PreguntasFrecuentesService from "services/servicios/PreguntasFrecuentesService";

export default function InfractorFilterForm({ formFilterObject }) {
  const [categorias, setCategorias] = useState([]);
  const formRef = useRef(null);

  const clearFilters = (e) => {
    const form = formRef.current;
    form.reset();
    e.preventDefault();
    formFilterObject.setoffset(0);
    formFilterObject.setInput(undefined);
    formFilterObject.setEstado(null);
    formFilterObject.setOrden(undefined);
    formFilterObject.setcategoria(undefined)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data)
    data.estado = data.estado === "Todas" ? null : data.estado;
    data.categoria = data.categoria === "Todas" ? null : data.categoria;
    formFilterObject.setoffset(0);
    formFilterObject.setEstado(data.estado);
    formFilterObject.setInput(data.input);
    formFilterObject.setOrden(data.orden);
    /* formFilterObject.setPuesto(data.categoria); */
    formFilterObject.setcategoria(data.categoria)
  };
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await PreguntasFrecuentesService.getCategorys();
        console.log(response.data);
        setCategorias(response.data);
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
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="input" />
            </Form.Group>
          </Col>
          <Col xl={4}>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado">
                <option value={null}>Todas</option>
                <option value={true}>Activas</option>
                <option value={false}>Inactivas</option>
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
