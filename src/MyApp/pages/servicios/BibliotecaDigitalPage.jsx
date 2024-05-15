import AdvanceTable from "MyApp/components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "MyApp/components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "MyApp/components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "MyApp/components/common/advance-table/AdvanceTableWrapper";
import PageHeader from "components/common/PageHeader";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { CiPause1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import bibliotecaInstance from "services/servicios/bibliotecaDigitalService";
const columns = [
  {
    accessor: "fecha",
    Header: "Fecha",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "descripcion",
    Header: "Descripción",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "categoria",
    Header: "categoría",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "estado",
    Header: "estado",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "acciones",
    Header: "Acciones",
    headerProps: { className: "text-900" },
  },
];


export default function BibliotecaDigitalPage() {

  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bibliotecaInstance.getAll();
        const mappedData = response.data.map((publicacion) => ({
          ...publicacion,
          estado: (
            <div
              className="fw-bold flex-shrink-0"
              style={{
                padding: "4px",
                borderRadius: "3px",
                backgroundColor: "#d9f8eb",
              }}
            >
              <span style={{ color: "#00894f", fontSize: "14px" }}>
                {publicacion.estado}
              </span>
              <FaCheck fill="#00894f" />
            </div>
          ),
          acciones: (
            <div className="d-flex gap-1">
              <Button size="sm" className="btn btn-secondary">
                <CiPause1 />
              </Button>
              <Button size="sm" className="btn btn-primary">
                <FaEdit size={18} />
              </Button>
              <Button size="sm" className="btn btn-danger">
                <FaTrash />
              </Button>
            </div>
          ),
        }));
        setData(mappedData);
        console.log(mappedData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <PageHeader
        title="Biblioteca digital"
        description="En esta sección puedes ver las publicaciones listadas,crear nuevas,editarlas y publicarlas"
        className="mb-3"
      />
      <Card className="p-2 ">
        <AdvanceTableWrapper
          columns={columns}
          data={data}
          sortable
          pagination
          perPage={5}
        >
          <Row className="flex-end-center mb-3">
            <Col xs="auto" sm={6} lg={4}>
              <AdvanceTableSearchBox table />
            </Col>
          </Row>
          <AdvanceTable
            table
            headerClassName="bg-200 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              bordered: true,
              striped: true,
              className: "fs-10 mb-0 overflow-hidden",
            }}
          />
          <div className="mt-3">
            <AdvanceTableFooter
              rowCount={data.length}
              table
              rowInfo
              navButtons
              rowsPerPageSelection
            />
          </div>
        </AdvanceTableWrapper>
      </Card>
    </>
  );
}
