import PageHeader from "MyApp/components/common/PageHeader";
import AdvanceTable from "MyApp/components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "MyApp/components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "MyApp/components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "MyApp/components/common/advance-table/AdvanceTableWrapper";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { CiPause1 } from "react-icons/ci";
import { FaCheck, FaEdit, FaPlay, FaTrash } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import IlegalesInstance from "services/servicios/IlegalesService";
const columns = [
  {
    accessor: "date",
    Header: "Fecha",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "fantasyName",
    Header: "Nombre de fantasía",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "address",
    Header: "Dirección",
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
export default function IlegalesPenalPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IlegalesInstance.getAll();
        const mappedData = response.data.map((publicacion) => ({
          ...publicacion,
          estado:
            publicacion.estado === "publicada" ? (
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
                  {publicacion.estado}
                </span>
                <MdOutlinePendingActions fill="#ac5a2b" />
              </div>
            ),
          acciones: (
            <div className="d-flex gap-1">
              <Button
                size="sm"
                className={`btn ${
                  publicacion.estado === "publicada"
                    ? "btn-secondary"
                    : "btn-success"
                }`}
              >
                {publicacion.estado === "publicada" ? <CiPause1 /> : <FaPlay />}
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
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="Inmobiliarias ilegales con causa penal"></PageHeader>
      <Row>
        <Col xl={12} className="mt-4">
          <Card className="p-2">
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
