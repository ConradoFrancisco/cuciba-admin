import FalconCloseButton from "components/common/FalconCloseButton";
import PageHeader from "components/common/PageHeader";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import NewsTitleForm from "./forms/NewsTitleForm";
import { NewsInstance } from "services/NewsServices";
import IconButton from "components/common/IconButton";
import MyLoadingComponent from "MyApp/my-components/MyLoadingComponent";
import { Link } from "react-router-dom";

export default function NewsListPage() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const columns = [
    {
      accessor: "id",
      Header: "ID",
      headerProps: { className: "text-900" },
    },
    {
      accessor: "titulo",
      Header: "Titulo",
      headerProps: { className: "text-900" },
    },
    {
      accessor: "estado",
      Header: "Estado",
      headerProps: { className: "text-900" },
    },
    {
      accessor: "acciones",
      Header: "Acciones",
      headerProps: { className: "text-900", display: "flex" },
    },
  ];

  const openModal = () => {
    setSmShow(true);
  };
  const closeModal = () => {
    setSmShow(false);
  };
  const [smShow, setSmShow] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response = await NewsInstance.getAll();
        const mappedData = response.results.map((item) => ({
          ...item,
          acciones: (
            <>
              <div className="d-flex justify-content-around">
              <Link to={`/noticias/editar/${item.id}`}>
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="success"
                  icon="edit"
                />
                </Link>              
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="primary"
                  icon="external-link-alt"
                />
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="danger"
                  icon="trash-alt"
                />
              </div>
            </>
          ),
        }));
        setData(mappedData);
        console.log(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <PageHeader
        title="Listado de noticias"
        description="En esta sección podes agregar o quitar noticias, editarlas y publicarlas."
        className="mb-3"
      >
        <button className="btn btn-primary btn-sm" onClick={openModal}>
          <FiPlus /> Agregar noticia
        </button>
        <Modal
          size="lg"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-sm"></Modal.Title>
            <FalconCloseButton onClick={() => setSmShow(false)} />
          </Modal.Header>
          <Modal.Body>
            <NewsTitleForm setData={setData} closeModal={closeModal} />
          </Modal.Body>
        </Modal>
      </PageHeader>

      {loading ? (
        <MyLoadingComponent />
      ) : (
        <Card className="p-2">
          <AdvanceTableWrapper
            columns={columns}
            data={data}
            sortable
            pagination
            perPage={5}
          >
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
      )}
    </>
  );
}
