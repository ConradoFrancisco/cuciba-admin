import AdvanceTable from "MyApp/components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "MyApp/components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "MyApp/components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "MyApp/components/common/advance-table/AdvanceTableWrapper";
import PageHeader from "components/common/PageHeader";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { CiPause1 } from "react-icons/ci";
import { FaCheck, FaEdit, FaPlay, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import AreasInstance from "services/institucional/AreaService";

export default function AbmAreas() {
  const [data, setData] = useState([]);
  const columns = [
    {
      accessor: "orden",
      Header: "Orden",
      headerProps: { className: "text-900" },
    },
    {
      accessor: "title",
      Header: "Nombre",
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
  useEffect(() => {
    const FetchAreas = async () => {
      try {
        const response = await AreasInstance.getAll();
        const mappedData = response.data.map((publicacion) => ({
          ...publicacion,
          estado:
            publicacion.estado === 1 ? (
              <div
                className="fw-bold flex-shrink-0"
                style={{
                  padding: "4px",
                  borderRadius: "3px",
                  backgroundColor: "#d9f8eb",
                }}
              >
                <span style={{ color: "#00894f", fontSize: "14px" }}>
                  {"Activa "}
                </span>
                <FaCheck fill="#00894f" />
              </div>
            ) : (
              <div
                className="fw-bold flex-shrink-0"
                style={{
                  padding: "4px",
                  borderRadius: "3px",
                  backgroundColor: "#fde6d8",
                }}
              >
                <span
                  className="ms-2"
                  style={{ color: "#ac5a2b", fontSize: "14px" }}
                >
                  {"Inactiva "}
                </span>
                <MdOutlinePendingActions fill="#ac5a2b" />
              </div>
            ),
          acciones: (
            <div className="d-flex gap-1 justify-content-evenly">
              <Button
                size="sm"
                className={`btn ${
                  publicacion.estado === 1 ? "btn-secondary" : "btn-success"
                }`}
              >
                {publicacion.estado === 1 ? <CiPause1 /> : <FaPlay />}
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
      } catch (e) {
        console.error(e);
      }
    };
    FetchAreas();
  }, []);
  return (
    <>
      <PageHeader title="Áreas">
        <button className="btn btn-primary btn-sm">
          <FiPlus /> Añadir área
        </button>
      </PageHeader>
      <Row className="mt-4">
        <Col>
          <Card className="p-4">
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
                size="sm"
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
        </Col>
      </Row>
    </>
  );
}
