import FalconCloseButton from "components/common/FalconCloseButton";
import PageHeader from "components/common/PageHeader";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useState } from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import NewsTitleForm from "./forms/NewsTitleForm";
import { NewsInstance } from "services/NewsServices";

import MyLoadingComponent from "MyApp/my-components/MyLoadingComponent";

import NewListItem from "./components/NewListItem";
import ListFilterComponent from "../property/components/ListFilterComponent";
import ListOrderComponent from "../property/components/ListOrderComponent";
import { useUser } from "MyApp/context/AuthProvider";

export default function NewsListPage() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isPublished] = React.useState(true);
  const [limit, setLimit] = useState(false);
  const [totalResults, settotalResults] = useState(false);
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
        let response;
        if (limit !== null) {
          response = await NewsInstance.getAll({ limit: limit });
        } else {
          response = await NewsInstance.getAll({});
        }
        setData(response.results);
        settotalResults(response.totalResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit]);
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
            <FalconCloseButton onClick={() => setSmShow(false)} />
          </Modal.Header>
          <Modal.Body>
            <NewsTitleForm
              setData={setData}
              closeModal={closeModal}
              limit={limit}
              settotalResults={settotalResults}
            />
          </Modal.Body>
        </Modal>
      </PageHeader>
      <Row className="g-3">
        <Col xs={12} sm={2}>
          <Card>
            <ListFilterComponent />
          </Card>
        </Col>
        <Col xs={12} sm={10}>
          {loading ? (
            <MyLoadingComponent />
          ) : (
            <>
              <ListOrderComponent
                totalResults={totalResults}
                limit={limit}
                setLimit={setLimit}
              />
              {data?.map((noticia, key) => (
                <NewListItem key={key} noticia={noticia} setData={setData} />
              ))}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
