import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyTableFooter from "MyApp/my-components/MyTableFooter";
import PageHeader from "components/common/PageHeader";
import useService from "hooks/useService";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import bibliotecaInstance from "services/servicios/bibliotecaDigitalService";
import PostBibliotecaForm from "./Forms/PostBibliotecaForm";
import BibliotecaFilterForm from "./Forms/FilterForms/BibliotecaFilterForm";

export default function BibliotecaDigitalPage() {
  const { filterObject } = useService({
    service: bibliotecaInstance.getAll,
  });

  const { data, limit, offset, setLimit, setoffset, total, setInput, setEstado, setOrden, setPuesto,setcategoria } = filterObject;
  const columns = ["categoria", "descripcion","fecha", "estado"];
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
      <PageHeader title="Biblioteca digital">
      </PageHeader>
      <Row>
        <Col xl={12} className="mt-4">
          <Card className="mb-4">
            <Accordion className="rounded">
              <Accordion.Header className="rounded">Filtros</Accordion.Header>
              <Accordion.Body>
               { <BibliotecaFilterForm formFilterObject={formFilterObject}/>}
              </Accordion.Body>
            </Accordion>
          </Card>
          <Card>
            <Card.Body>
              {data.length > 0 ? (
                <MyTableComponent
                  setActiveFunction={bibliotecaInstance.setActive}
                  deleteFunction={bibliotecaInstance.delete}
                  AddFormComponent={<PostBibliotecaForm/>}
                  section={"post"}
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
