import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyTableFooter from "MyApp/my-components/MyTableFooter";
import PageHeader from "components/common/PageHeader";
import useService from "hooks/useService";
import { Accordion, AccordionBody, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TribunalEticaService from "services/institucional/TribunalEticaService";
import Tribunalform from "../forms/TribunalForm";
import FilterTribunalForm from "../forms/filterForms/FilterTribunalForm";

export default function AutoridadesTribunalPage() {
  const { filterObject } = useService({ service: TribunalEticaService.getAll });
  const columns = ["nombre", "apellido","orden", "cargo","estado"];
  const {
    data,
    offset,
    setoffset,
    limit,
    total,
    setFlag,
    setInput,
    setOrderBy,
    setPuesto,
    setLimit,
    setOrden,
    setEstado,
  } = filterObject;

  const formFilterObject = {
    setInput,
    setOrden,
    setEstado,
    setPuesto,
    setoffset,
  };
  return (
    <>
      <PageHeader title="Autoridades">
        <div className="d-flex gap-2 mt-3">
          <Link
            to={"/institucional/autoridades"}
            className="btn btn-primary btn-sm"
          >
            Autoridades Principales
          </Link>
          <Link
            to={"/institucional/comision-revisadora"}
            className="btn btn-primary btn-sm"
          >
            Comisión revisadora de cuentas
          </Link>
        </div>
      </PageHeader>
      <Row>
        <Col xl={12}>
          <Card className="mb-4 mt-4">
            
            <Accordion className="rounded">
              <Accordion.Header className="rounded">Filtros</Accordion.Header>
              <AccordionBody>
                <FilterTribunalForm formFilterObject={formFilterObject} />
              </AccordionBody>
            </Accordion>
          </Card>
          <Card className="p-4 mt-4">
          <Card.Header style={{ paddingBottom: "0px" }}>
              <h4>Tribunal de ética y disciplina</h4>
            </Card.Header>
            {data.length > 0 ? (
              <MyTableComponent
                deleteFunction={TribunalEticaService.delete}
                setActiveFunction={TribunalEticaService.setActive}
                data={data}
                filterObject={filterObject}
                columns={columns}
                AddFormComponent={<Tribunalform />}
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
          </Card>
        </Col>
      </Row>
    </>
  );
}
