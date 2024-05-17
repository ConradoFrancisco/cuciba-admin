import MyPersonalTable from "MyApp/my-components/MyPersonalTable";
import PageHeader from "components/common/PageHeader";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import PersonalInstance from "services/institucional/PersonalService";

export default function PersonalPage() {
  const [data, setData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PersonalInstance.getAll();
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
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
                <MyPersonalTable data={data} />
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
