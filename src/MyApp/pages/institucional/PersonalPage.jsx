
import MyPersonalTable from "MyApp/my-components/MyPersonalTable";

import PageHeader from "components/common/PageHeader";
import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import PersonalInstance from "services/institucional/PersonalService";

export default function PersonalPage() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState()
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PersonalInstance.getAll({ limit });
        console.log(response)
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
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Área</th>
                      <th scope="col">Puesto</th>
                      <th scope="col">Teléfono</th>
                      <th scope="col">Mail</th>
                      <th className="text-end" scope="col">
                        acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((trabajador,key)=>{
                      return(
                        <tr className="align-middle" key={trabajador.id}>
                            <td className="text-nowrap">{trabajador.name}</td>
                            <td className="text-nowrap">{trabajador.area.slice(0, 35)}</td>
                            <td className="text-nowrap">{trabajador.position?.slice(0, 35)}</td>
                            <td className="text-nowrap">{trabajador.phone ? trabajador.phone : "-"}</td>
                            <td className="text-nowrap">{trabajador.email ? trabajador.email : "-"}</td>

                            <td className="text-end">
                              
                            </td>
                          </tr>
                      )
                    })}
                  </tbody>
                </Table>
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
