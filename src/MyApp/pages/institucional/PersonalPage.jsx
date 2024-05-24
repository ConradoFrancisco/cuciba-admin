
import MyTableComponent from "MyApp/components/common/MyTableComponent";
import MyPersonalTable from "MyApp/my-components/MyPersonalTable";

import PageHeader from "components/common/PageHeader";
import useService from "hooks/useService";
import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import PersonalInstance from "services/institucional/PersonalService";

export default function PersonalPage() {
  const asd = ["name","lastname","phone","email","position","area"]
  const [limit, setLimit] = useState()
  const location = useLocation();
  
  const {filterObject} = useService({service:PersonalInstance.getAll})

  const {data} = filterObject
  const isEditRoute = location.pathname.includes("/editar/");

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
              <MyTableComponent data={data} filterObject={filterObject} columns={asd}/>

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
