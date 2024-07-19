import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyTable from "MyApp/my-components/MyTable";
import MyTableFooter from "MyApp/my-components/MyTableFooter";
import PageHeader from "components/common/PageHeader";
import useService from "hooks/useService";
import { Accordion, AccordionBody, Card, Col, Row } from "react-bootstrap";
import AutoridadesPrincipalesService from "services/institucional/AutoridadesPrincipalesService";
import AutoridadForm from "./forms/AutoridadForm";
import FilterAutoridadForm from "./forms/filterForms/FilterAutoridadForm";
import { Link } from "react-router-dom";

export default function AutoridadesPage() {
  const { filterObject } = useService({
    service: AutoridadesPrincipalesService.getAll,
  });

  const { data, limit, offset, setLimit, setoffset, total, setInput, setEstado, setOrden, setPuesto } = filterObject;
  const columns = ["nombre", "apellido", "orden", "puesto", "estado"];
  const formFilterObject = {
    setoffset,
    setInput,
    setEstado,
    setOrden,
    setPuesto
  };
  console.log(data)
  return (
    <>
      <PageHeader title="Autoridades">
        <div className="d-flex gap-2 mt-3">
          <Link
            to={"/institucional/comision-revisadora"}
            className="btn btn-primary btn-sm"
          >
            Comisión revisadora de cuentas
          </Link>
        <Link
            to={"/institucional/tribunal"}
            className="btn btn-primary btn-sm"
          >
            Tribunal de ética y disciplina
          </Link>
        </div>
      </PageHeader>
      <Row>
        <Col xl={12} className="mt-4">
          <Card className="mb-4">
            <Accordion className="rounded">
              <Accordion.Header className="rounded">Filtros</Accordion.Header>
              <AccordionBody>
                <FilterAutoridadForm formFilterObject={formFilterObject} />
              </AccordionBody>
            </Accordion>
          </Card>
          <Card>
            
            <Card.Body>
            <Card.Header style={{ paddingBottom: "0px" }}>
              <h4>Autoridades Principales</h4>
            </Card.Header>
              {data.length > 0 ? (
                <MyTableComponent
                  deleteFunction={AutoridadesPrincipalesService.delete}
                  setActiveFunction={AutoridadesPrincipalesService.setActive}
                  AddFormComponent={<AutoridadForm />}
                  section={"Autoridades"}
                  data={data}
                  columns={columns}
                  filterObject={filterObject}
                />
              ) : (
                <h4>No hay datos que coincidan con tus busquedas</h4>
              )}
              <div className="row">
                <MyTableFooter
                  limit={limit}
                  offset={offset}
                  setLimit={setLimit}
                  setoffset={setoffset}
                  total={total}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
