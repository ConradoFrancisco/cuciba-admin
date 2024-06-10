import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyTableFooter from "MyApp/my-components/MyTableFooter";
import PageHeader from "components/common/PageHeader";
import useService from "hooks/useService";
import { Accordion, AccordionBody, Card, Col, Row } from "react-bootstrap";
import PreguntasFrecuentesFilterForm from "./Forms/FilterForms/PreguntasFrecuentesFilterForm";
import InmobiliariasIlegalesServices from "services/servicios/InmobiliariasIlegalesServices";
import InmobiliariasIlegalesPenalForm from "./Forms/InmobiliariasIlegalesPenalForm";
import SancionesService from "services/servicios/SancionesService";
import SancionesForm from "./Forms/SancionesForm";
import SancionesFilterForm from "./Forms/FilterForms/SancionesFilterForm";

export default function IlegalesPage() {
  const { filterObject } = useService({
    service: SancionesService.getAll,
  });

  const { data, limit, offset, setLimit, setoffset, total, setInput, setEstado, setOrden, setPuesto, setcategoria } = filterObject;
  const columns = ["categoria", "descripcion", "fecha", "estado"];
  const formFilterObject = {
    setoffset,
    setInput,
    setEstado,
    setOrden,
    setPuesto,
    setcategoria
  };
  console.log(data)
  return (
    <>
      <PageHeader title="Sanciones del tribunal">
      </PageHeader>
      <Row>
        <Col xl={12} className="mt-4">
          <Card className="mb-4">
            <Accordion className="rounded">
              <Accordion.Header className="rounded">Filtros</Accordion.Header>
              <AccordionBody>
                <SancionesFilterForm formFilterObject={formFilterObject} />
              </AccordionBody>
            </Accordion>
          </Card>
          <Card>

            <Card.Body>
              <MyTableComponent
                setActiveFunction={SancionesService.setActive}
                deleteFunction={SancionesService.delete}
                AddFormComponent={<SancionesForm />}
                section={"inmobiliaria"}
                data={data}
                columns={columns}
                filterObject={filterObject}
              />
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