import MyTable from "MyApp/my-components/MyTable";
import PageHeader from "components/common/PageHeader";
import { Card, Col, Row } from "react-bootstrap";

export default function AutoridadesPage() {
  const autoridadesPrinciaples = [
    {
      id: 1,
      name: "Diego Guillermo Frangella",
      avatar: "http://168.197.49.125:3000/images/autoridades/autoridad1.jpg",
      puesto: "Presidente",
      estado: "Activo",
    },
    {
      id: 1,
      name: "Nora Guerschanik",
      avatar: "http://168.197.49.125:3000/images/autoridades/autoridad2.jpg",
      puesto: "Vicepresidente 1º",
      estado: "Activo",
    },
    {
      id: 1,
      name: "Nélida Abdala",
      avatar: "http://168.197.49.125:3000/images/autoridades/autoridad3.jpg",
      puesto: "Vicepresidente 2º",
      estado: "Activo",
    },
    {
      id: 1,
      name: "Pablo Abbatangelo",
      avatar: "http://168.197.49.125:3000/images/autoridades/autoridad4.jpg",
      puesto: "Secretario",
      estado: "Activo",
    },
    {
      id: 1,
      name: "Héctor Menéndez",
      avatar: "http://168.197.49.125:3000/images/autoridades/autoridad5.jpg",
      puesto: "Prosecretario",
      estado: "Activo",
    },
    {
      id: 1,
      name: "Diego Guillermo Frangella",
      avatar: "http://168.197.49.125:3000/images/autoridades/autoridad6.jpg",
      puesto: "Tesorero",
      estado: "Activo",
    },
  ];
  const tribunaleticaDisciplina = [
    {
      id: 1,
      name: "Rosana Maria A. Ruiz Anduaga",

      puesto: "Titular",
      estado: "Activo",
    },
    {
      id: 2,
      name: "Jorge Alberto La Torre",

      puesto: "Titular",
      estado: "Activo",
    },
    {
      id: 3,
      name: "Nora Amelia Ghezzi",

      puesto: "Titular",
      estado: "Activo",
    },
    {
      id: 4,
      name: "Fortunato José Suppa",
      puesto: "titular",
      estado: "Activo",
    },
    {
      id: 5,
      name: "Roberto Nicolás Arevalo",
      puesto: "Titular",
      estado: "Activo",
    },
    {
      id: 6,
      name: "María Cruz Casares",
      puesto: "Suplente",
      estado: "Activo",
    },
    {
      id: 7,
      name: "Diego Ruben Armua",
      puesto: "Suplente",
      estado: "Activo",
    },
    {
      id: 8,
      name: "Haydee M. La Rosa",
      puesto: "Suplente",
      estado: "Activo",
    },
    {
      id: 9,
      name: "José Daniel Becerra",
      puesto: "Suplente",
      estado: "Activo",
    },
    {
      id: 10,
      name: "Irma Mabel Fernandez",
      puesto: "Suplente",
      estado: "Activo",
    },
  ];
  const comisionRevisadoraDeCuentas = [
    {
      id: 1,
      name: "Osvaldo Alberto Distefano",

      puesto: "Titular",
      estado: "Activo",
    },
    {
      id: 2,
      name: "Mónica Gabriela Jabie",

      puesto: "Titular",
      estado: "Activo",
    },
    {
      id: 3,
      name: "Emiliano Oscar Bellino Bat",

      puesto: "Titular",
      estado: "Activo",
    },
    {
      id: 4,
      name: "Noemí Saavedra",
      puesto: "titular",
      estado: "Activo",
    },
    {
      id: 5,
      name: "Armando Caputo",
      puesto: "Titular",
      estado: "Activo",
    },
    {
      id: 6,
      name: "Jacqueline Adriana Amabile",
      puesto: "Tesorero",
      estado: "Activo",
    },
  ];
  return (
    <>
      <PageHeader title="Autoridades"></PageHeader>
      <Row>
        <Col xl={12} className="mt-4">
          <Card>
            <Card.Header style={{ paddingBottom: "0px" }}>
              <h4>Autoridades Principales</h4>
            </Card.Header>
            <Card.Body>
              <MyTable data={autoridadesPrinciaples} />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="mt-4 d-flex">
          <Card className="w-100">
            <Card.Header style={{ paddingBottom: "0px" }}>
              <h4 className="m-auto">Tribunal de ética y disciplina</h4>
            </Card.Header>
            <Card.Body>
              <MyTable data={tribunaleticaDisciplina} />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="mt-4 d-flex ">
          <Card className="w-100">
            <Card.Header style={{ paddingBottom: "0px" }}>
              <h4>Comisión revisadora de cuentas</h4>
            </Card.Header>
            <Card.Body>
              <MyTable data={comisionRevisadoraDeCuentas} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
