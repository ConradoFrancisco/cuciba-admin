import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyTableFooter from "MyApp/my-components/MyTableFooter";
import PageHeader from "components/common/PageHeader";
import useService from "hooks/useService";
import { Accordion, AccordionBody, Card, Col, Row } from "react-bootstrap";
import PreguntasFrecuentesService from "services/servicios/PreguntasFrecuentesService";
import PreguntaFrecuenteForm from "./Forms/PreguntaFrecuenteForm";
import PreguntasFrecuentesFilterForm from "./Forms/FilterForms/PreguntasFrecuentesFilterForm";
import InmobiliariasIlegalesServices from "services/servicios/InmobiliariasIlegalesServices";
import InmobiliariasIlegalesPenalForm from "./Forms/InmobiliariasIlegalesPenalForm";
import InmobiliariasIlegalesForm from "./Forms/FilterForms/InmobiliariasIlegalesForm";

export default function IlegalesPage(){
    const { filterObject } = useService({
        service: InmobiliariasIlegalesServices.getAll,
      });
    
      const { data, limit, offset, setLimit, setoffset, total, setInput, setEstado, setOrden, setPuesto,setcategoria } = filterObject;
      const columns = ["nombre", "direccion","fecha", "estado"];
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
          <PageHeader title="Inmobiliarias ilegales">
          </PageHeader>
          <Row>
            <Col xl={12} className="mt-4">
              <Card className="mb-4">
                <Accordion className="rounded">
                  <Accordion.Header className="rounded">Filtros</Accordion.Header>
                  <AccordionBody>
                    <PreguntasFrecuentesFilterForm formFilterObject={formFilterObject}/>
                  </AccordionBody>
                </Accordion>
              </Card>
              <Card>

                <Card.Body>
                  {data.length > 0 ? (
                    <MyTableComponent
                      setActiveFunction={InmobiliariasIlegalesServices.setActive}
                      deleteFunction={InmobiliariasIlegalesServices.delete}
                      AddFormComponent={<InmobiliariasIlegalesForm/>}
                      section={"inmobiliaria"}
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