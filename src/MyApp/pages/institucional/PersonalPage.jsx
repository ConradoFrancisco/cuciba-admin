import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyPersonalTable from "MyApp/my-components/MyPersonalTable";
import MyTableFooter from "MyApp/my-components/MyTableFooter";

import PageHeader from "components/common/PageHeader";
import useService from "hooks/useService";
import { useEffect, useState } from "react";
import { Accordion, AccordionBody, Card, Col, Row, Table } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import PersonalInstance from "services/institucional/PersonalService";
import NewsTitleForm from "../news/forms/NewsTitleForm";
import PersonalForm from "./forms/PersonalForm";
import FilterPersonalform from "./forms/filterForms/FilterPersonalForm";

export default function PersonalPage() {
  const columns = ["nombre","area","cargo","email","telefono", "estado"];
  const location = useLocation();

  const { filterObject } = useService({ service: PersonalInstance.getAll });

  const { data, limit, offset, setLimit, setoffset, total,setInput,input,setEstado,setOrden,orderDirection,orderBy } = filterObject;
  const isEditRoute = location.pathname.includes("/editar/");
  const formFilterObject = {
    setoffset,
    setInput,
    setEstado,
    setOrden,
    input
  };
  return (
    <>
      {!isEditRoute ? (
        <>
          <PageHeader title="Personal del colegio por areas">
            <div className="d-flex mt-3">
              <Link
                to={"/institucional/administrar-areas"}
                className="btn btn-primary btn-sm"
              >
                Administrar áreas
              </Link>
            </div>
          </PageHeader>
          <Row className="mt-4">
            <Col>
            <Card>
            <Accordion className="rounded">
              <Accordion.Header className="rounded">Filtros</Accordion.Header>
              <AccordionBody>
                <FilterPersonalform formFilterObject={formFilterObject} />
              </AccordionBody>
            </Accordion>
          </Card>
              <Card className="p-4 mt-4">
                {data.length > 0 ? (
                  <MyTableComponent
                    deleteFunction={PersonalInstance.delete}
                    setActiveFunction={PersonalInstance.setActive}
                    AddFormComponent={<PersonalForm />}
                    data={data}
                    filterObject={filterObject}
                    columns={columns}
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
      ) : (
        <Outlet />
      )}
    </>
  );
}
