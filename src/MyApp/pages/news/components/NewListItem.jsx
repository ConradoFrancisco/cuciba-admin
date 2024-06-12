import IconButton from "MyApp/components/common/IconButton";
import FalconCloseButton from "components/common/FalconCloseButton";
import { useState } from "react";
import { Button, Card, Col, Image, Modal, Row, Spinner } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NewsInstance } from "services/NewsServices";

export default function NewListItem({ item,flag,setFlag }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  console.log(item)
  const handleSetActive = async ( id, estado ) => {
    try {
      const response = await NewsInstance.setActive({ id, estado });
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      setOpenModal(false);
      const newflag = flag + 1;
      setFlag(newflag)
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await NewsInstance.delete(id);
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      setOpenModal(false);
      const newflag = flag + 1;
      setFlag(newflag)
    }
  }

  const handleOpenModal = (action, item = null) => {
    setSelectedItem(item);
    setModalAction(action);
    setOpenModal(true);
    console.log(action);
  };
  const EstadoCirculo = ({ estado }) => {
    const circleClass = estado ? "green" : "red";

    return (
      <div className="d-flex gap-2" style={{ alignItems: "center" }}>
        <span className="fw-bold" style={{ color: circleClass }}>
          {estado ? "Activa" : "Inactiva"}
        </span>
        <span
          style={{
            display: "inline-block",
            borderRadius: "50%",
            width: "15px",
            height: "15px",
            backgroundColor: circleClass,
            border: "1px solid",
          }}
        ></span>
      </div>
    );
  };
  return (
    <>
      <Card key={item.id} className="mb-4">
        <Card.Header
          className="d-flex gap-2 justify-content-between"
          style={{ borderBottom: "1px solid #f0f0f0" }}
        >
          <h5>{item.title}</h5> <EstadoCirculo estado={item.estado} />{" "}
        </Card.Header>
        <Card.Body className="d-flex gap-3">
          <img
            style={{ maxWidth: "100px" }}
            src={`http://localhost:8080/${item.Imagens[0].imageUrl}`}
          />
          <p>{item.description}</p>
        </Card.Body>
        <Card.Footer
          className="d-flex justify-content-between gap-2"
          style={{ borderTop: "1px solid #f0f0f0" }}
        >
          <div>
            <span>Fecha: {item.date}</span>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant={item.estado === 0 ? "success" : "secondary"}
              onClick={
                item.estado === 0
                  ? () => handleOpenModal("publicar", item)
                  : () => handleOpenModal("Pausar", item)
              }
            >
              {item.estado === 0 ? "Publicar" : "Pausar"}
            </Button>
            <Link className="btn btn-primary" to={`/noticias/editar/${item.id}`}>Editar</Link>
            <Button
              variant="danger"
              onClick={() => handleOpenModal("eliminar", item)}
            >
              Eliminar
            </Button>
          </div>
        </Card.Footer>
      </Card>
      <Modal size="lg" show={openModal}>
        {modalAction === "publicar" ? (
          <>
            <Modal.Header>
              <h5>Publicar noticia</h5>
              <FalconCloseButton onClick={() => setOpenModal(false)} />
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column">
                <h5 className="text-center">
                  Ustéd esta a punto de activar la noticia '{item.title}' ¿Desea
                  proseguir?
                </h5>
                <div className="d-flex justify-content-center gap-3 pt-3">
                  <Button
                    variant="success"
                    onClick={() => handleSetActive(item.id,1)}
                  >
                    Continuar
                  </Button>
                  <Button onClick={() => setOpenModal(false)} variant="danger">
                    Cancelar
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </>
        ) : modalAction === 'Pausar' ? (
          <>
            <Modal.Header>
              <h5>Pausar noticia</h5>
              <FalconCloseButton onClick={() => setOpenModal(false)} />
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column">
                <h5 className="text-center">
                  Ustéd esta a punto de pausar la noticia '{item.title}' ¿Desea
                  proseguir?
                </h5>
                <div className="d-flex justify-content-center gap-3 pt-3">
                  <Button
                    variant="success"
                    onClick={() => handleSetActive(item.id,0)}
                  >
                    Continuar
                  </Button>
                  <Button onClick={() => setOpenModal(false)} variant="danger">
                    Cancelar
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </>
        ) : modalAction === 'eliminar' ? (
          <>
            <Modal.Header>
              <h5>Eliminar noticia</h5>
              <FalconCloseButton onClick={() => setOpenModal(false)} />
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column">
                <h5 className="text-center">
                  Ustéd esta a punto de eliminar la noticia '{item.title}' ¿Desea
                  proseguir?
                </h5>
                <div className="d-flex justify-content-center gap-3 pt-3">
                  <Button
                    variant="success"
                    onClick={() => handleDelete(item.id)}
                  >
                    Continuar
                  </Button>
                  <Button onClick={() => setOpenModal(false)} variant="danger">
                    Cancelar
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </>
        ):''}
      </Modal>
    </>
  );
}
