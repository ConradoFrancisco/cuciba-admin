import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyTableFooter from "MyApp/my-components/MyTableFooter";
import PageHeader from "components/common/PageHeader";
import useService from "hooks/useService";
import { Accordion, AccordionBody, Card, Col, Row } from "react-bootstrap";
import PreguntasFrecuentesService from "services/servicios/PreguntasFrecuentesService";
import PreguntaFrecuenteForm from "./Forms/PreguntaFrecuenteForm";

export default function PreguntasFrecuentesPage(){
    const { filterObject } = useService({
        service: PreguntasFrecuentesService.getAll,
      });
    
      const { data, limit, offset, setLimit, setoffset, total, setInput, setEstado, setOrden, setPuesto } = filterObject;
      const columns = ["pregunta", "categoria", "estado"];
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
          <PageHeader title="Preguntas Frecuentes">
          </PageHeader>
          <Row>
            <Col xl={12} className="mt-4">
              <Card className="mb-4">
                <Accordion className="rounded">
                  <Accordion.Header className="rounded">Filtros</Accordion.Header>
                  <AccordionBody>
                  </AccordionBody>
                </Accordion>
              </Card>
              <Card>
                <Card.Header style={{ paddingBottom: "0px" }}>
                  <h4>Preguntas Frecuentes</h4>
                </Card.Header>
                <Card.Body>
                  {data.length > 0 ? (
                    <MyTableComponent
                      AddFormComponent={<PreguntaFrecuenteForm/>}
                      section={"Pregunta"}
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