import AdvanceTable from "MyApp/components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "MyApp/components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "MyApp/components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "MyApp/components/common/advance-table/AdvanceTableWrapper";
import FalconCloseButton from "components/common/FalconCloseButton";
import PageHeader from "components/common/PageHeader";
import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { CiPause1 } from "react-icons/ci";
import { FaCheck, FaEdit, FaPlay, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import AreasInstance from "services/institucional/AreaService";
import Areaform from "./forms/AreaForm";
import ModalContent from "./components/ModalContent";

export default function AbmAreas() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);

  const handleOpenModal = (action, area = null) => {
    setSelectedArea(area);
    setModalAction(action);
    setOpenModal(true);
  };

  
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
    console.log(flag);
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
                onClick={
                  publicacion.estado === 0
                    ? () => handleOpenModal('activar',publicacion)
                    : () => handleOpenModal('desactivar',publicacion)
                }
                className={`btn ${
                  publicacion.estado === 1 ? "btn-secondary" : "btn-success"
                }`}
              >
                {publicacion.estado === 1 ? <CiPause1 /> : <FaPlay />} 
              </Button>
              <Button size="sm" className="btn btn-primary">
                <FaEdit size={18} />
              </Button>
              <Button onClick={() => handleOpenModal('eliminar',publicacion)} size="sm" className="btn btn-danger">
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
  }, [flag]);
  return (
    <>
      <PageHeader title="Áreas">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleOpenModal('añadir')}
        >
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
      <Modal size="lg" show={openModal}>
        <ModalContent area={selectedArea} tipo={modalAction} flag={flag} setFlag={setFlag} setOpenModal={setOpenModal} />
        {/* <div className="container">
          <Modal.Header>
            <h4>Ingrese un área</h4>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <Areaform
              setOpenModal={setOpenModal}
              flag={flag}
              setFlag={setFlag}
            ></Areaform>
          </Modal.Body>
        </div> */}
      </Modal>
      
    </>
  );
}
