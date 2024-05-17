import { Card, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "components/common/PageHeader";
import PersonalInstance from "services/institucional/PersonalService";

const Areas = [
  "RECEPCIÓN",
  "SECRETARÍA DE CONSEJO DIRECTIVO",
  "MATRICULADOS",
  "FISCALIZACIÓN",
  "FISCALIZACIÓN E INSPECCIONES ADMINISTRACION DE FISCALIZACION - INFRACTORES",
  "ADMINISTRACIÓN DE FISCALIZACIÓN ILEGALES E INFRACTORES DE EXTRAÑA JURISDICCIÓN",
  "CUERPO DE INSPECTORES / NOTIFICADORES",
  "LEGALES",
  "COMUNICACIÓN,WEB,CABAPROP,REVISTA CUCICBA",
  "ACTIVIDADES ACADEMICAS",
  "REDES SOCIALES",
  "ADMINISTRACIÓN Y FINANZAS",
  "CONTROLLER Y RESP. RRHH",
];

export default function CreateEditPage() {
  const { id } = useParams();
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [worker, SetWorker] = useState();
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const pattern = /^[0-9]{4}-[0-9]{4}$/;
    setPhone(value);
    setPhoneValid(pattern.test(value));
  };

  useEffect(() => {
    const fetchWorker = async (id) => {
      try {
        const data = await PersonalInstance.getSingleWorker(id);
        SetWorker(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchWorker(parseInt(id));
  }, []);

  return (
    <>
      <PageHeader title={id ? "Editar" : "Crear"} />
      <Row className="mt-4">
        <Col xl={12}>
          <Card className="p-4">
            <Form>
              <Row>
                <Col xl={6}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={worker ? worker.name : ""}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="position">
                    <Form.Label>Puesto</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group>
                    <Form.Label>Área</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Seleccione un Área</option>
                      {Areas.map((area, key) => (
                        <option key={key} value={key}>
                          {area}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-3" controlId="phone">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="1234-5678"
                      value={phone}
                      onChange={handlePhoneChange}
                      isInvalid={!phoneValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      El formato debe ser 1234-5678
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
