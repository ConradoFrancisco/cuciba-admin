import PageHeader from "components/common/PageHeader";

import { Accordion, AccordionBody, Card, Col, Row } from "react-bootstrap";

import AreasInstance from "services/institucional/AreaService";

import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyTableFooter from "MyApp/my-components/MyTableFooter";
import Filterform from "./forms/FilterForm";
import useService from "hooks/useService";
const columns = ["orden", "title", "estado"];
export default function AbmAreas() {
  const { filterObject } = useService({ service: AreasInstance.getAll });

  const {
    data,
    setEstado,
    setInput,
    setLimit,
    setOrden,
    setoffset,
    total,
    limit,
    offset,
  } = filterObject;

  const formFilterObject = {
    setoffset,
    setInput,
    setEstado,
    setOrden,
  };

  return (
    <>
      <PageHeader title="Áreas">
        {/* <button
          className="btn btn-primary btn-sm"
          onClick={() => handleOpenModal("añadir")}
        >
          <FiPlus /> Añadir área
        </button> */}
      </PageHeader>
      <Row className="mt-4">
        <Col>
          <Card>
            <Accordion className="rounded">
              <Accordion.Header className="rounded">Filtros</Accordion.Header>
              <AccordionBody>
                <Filterform formFilterObject={formFilterObject} />
              </AccordionBody>
            </Accordion>
          </Card>
          <Card className="p-4 mt-4">
            {data.length > 0 ? (
              <MyTableComponent data={data} filterObject={filterObject} columns={columns} />
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
