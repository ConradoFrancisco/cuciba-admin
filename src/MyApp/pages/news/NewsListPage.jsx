import FalconCloseButton from "components/common/FalconCloseButton";
import PageHeader from "components/common/PageHeader";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useState } from "react";
import { Card, Col, Image, Modal, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import NewsTitleForm from "./forms/NewsTitleForm";
import { NewsInstance } from "services/NewsServices";
import IconButton from "components/common/IconButton";
import MyLoadingComponent from "MyApp/my-components/MyLoadingComponent";
import { Link } from "react-router-dom";
import AdvanceTableSearchBox from "MyApp/components/common/advance-table/AdvanceTableSearchBox";
import NewListItem from "./components/NewListItem";
import ListFilterComponent from "../property/components/ListFilterComponent";
import ListOrderComponent from "../property/components/ListOrderComponent";

export default function NewsListPage() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isPublished] = React.useState(true);

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
        setData(response.results)
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
              <ListOrderComponent />
              {data?.map((noticia, key) => (
                <NewListItem key={key} noticia={noticia} />
              ))}
            </>
          )}

        </Col>
      </Row>
    </>
  );
}
