import IconButton from "MyApp/components/common/IconButton";
import FalconCloseButton from "components/common/FalconCloseButton";
import { useState } from "react";
import { Button, Card, Col, Image, Modal, Row, Spinner } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NewsInstance } from "services/NewsServices";

export default function NewListItem({ noticia, setData }) {
  const [smShow, setSmShow] = useState(false);
  const [smShowPublic, setSmShowPublic] = useState(false);
  const [smShowPause, setSmShowPause] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteNoticia = async (id) => {
    setLoading(true);
    try {
      const data = await NewsInstance.delete(id);
      setData(data.data);
    } catch (e) {
      console.error("error al eliminar");
    } finally {
      setLoading(false);
      setSmShow(false);
    }
  };

  const handlePublicarNoticia = async (id) => {
    setLoading(true);
    try {
      const data = await NewsInstance.publicar(id);
      setData(data.data);
    } catch (e) {
      console.error("error al eliminar");
    } finally {
      setLoading(false);
      setSmShowPublic(false);
    }
  };
  const handlePausarNoticia = async (id) => {
    setLoading(true);
    try {
      const data = await NewsInstance.pausar(id);
      setData(data.data);
    } catch (e) {
      console.error("error al eliminar");
    } finally {
      setLoading(false);
      setSmShowPause(false);
    }
  };
  return noticia ? (
    <>
      <Card className="mt-2">
        <Card.Body>
          <Row>
            <Col xs={12} sm={3}>
              <Image src={noticia.imageUrl} fluid />
            </Col>
            <Col xs={12} sm={6}>
              <span className="d-block fw-bold">{noticia.title}</span>
            </Col>
            <Col xs={12} sm={3}>
              <Row className="mb-3">
                <Col className="">
                  <Row>
                    
                    <Col className="d-flex justify-content-end">
                      <span className="small">
                        Estado: <strong>{noticia.estado}</strong>
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="border-top">
          <Row>
            <Col className="m-0">
              <span className="m-1">
                <small className="text-muted">
                  <strong>ID:</strong> {noticia.id}
                </small>
              </span>
              <span className="m-1">
                <small className="text-muted">
                  <strong>Creado:</strong> Last updated 3 mins ago
                </small>
              </span>
            </Col>
            <Col className="d-flex align-items-end justify-content-end m-0">
              {noticia.estado === "no publicada" ? (
                <button
                  onClick={() => setSmShowPublic(true)}
                  style={{ border: "none", padding: "0px", background: "none" }}
                >
                  <IconButton
                    className="m-1"
                    size="sm"
                    variant="success"
                    icon="chevron-right"
                  />
                </button>
              ) : (
                <button
                  onClick={() => setSmShowPause(true)}
                  style={{ border: "none", padding: "0px", background: "none" }}
                >
                  <IconButton
                    className="m-1"
                    size="sm"
                    variant="secondary"
                    icon=""
                  >
                    <strong>II</strong>
                  </IconButton>
                </button>
              )}

              <Link to={`/noticias/editar/${noticia.id}`}>
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="primary"
                  icon="edit"
                />
              </Link>
              <Link to={`${process.env.FRONTEND_URL}/noticias${noticia.id}`}>
                <IconButton
                  className="m-1 border"
                  size="sm"
                  variant="light"
                  icon="external-link-alt"
                />
              </Link>
              <button
                onClick={() => setSmShow(true)}
                style={{ border: "none", padding: "0px", background: "none" }}
              >
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="danger"
                  icon="trash-alt"
                />
              </button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <Modal
        size="lg"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <div className="d-flex justify-content-end">
          <FalconCloseButton onClick={() => setSmShow(false)} className="p-2" />
        </div>
        <Modal.Body>
          <div>
            <h5>
              Usted esta a punto de eliminar la noticia: '{noticia.title}'.
              ¿desea Proseguir?
              <div className="d-flex justify-content-center gap-3 pt-3">
                {loading ? (
                  <Button
                    variant="success"
                    className="d-inline-flex flex-center"
                    disabled
                  >
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    <span className=""> Cargando...</span>
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => handleDeleteNoticia(noticia.id)}
                  >
                    Continuar
                  </Button>
                )}
                <button
                  onClick={() => setSmShow(false)}
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </div>
            </h5>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={smShowPublic}
        onHide={() => setSmShowPublic(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <div className="d-flex justify-content-end">
          <FalconCloseButton
            onClick={() => setSmShowPublic(false)}
            className="p-2"
          />
        </div>
        <Modal.Body>
          <div>
            <h5>
              Usted esta a punto de Publicar la noticia: '{noticia.title}'.
              ¿desea Proseguir?
              <div className="d-flex justify-content-center gap-3 pt-3">
                {loading ? (
                  <Button
                    variant="success"
                    className="d-inline-flex flex-center"
                    disabled
                  >
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    <span className=""> Cargando...</span>
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => handlePublicarNoticia(noticia.id)}
                  >
                    Continuar
                  </Button>
                )}
                <button
                  onClick={() => setSmShowPublic(false)}
                  className="btn btn-danger asd"
                >
                  Cancelar
                </button>
              </div>
            </h5>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={smShowPause}
        onHide={() => setSmShowPause(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <div className="d-flex justify-content-end">
          <FalconCloseButton
            onClick={() => setSmShowPause(false)}
            className="p-2"
          />
        </div>
        <Modal.Body>
          <div>
            <h5>
              Usted esta a punto de Pausar la noticia: '{noticia.title}'. ¿desea
              Proseguir?
              <div className="d-flex justify-content-center gap-3 pt-3">
                {loading ? (
                  <Button
                    variant="success"
                    className="d-inline-flex flex-center"
                    disabled
                  >
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    <span className=""> Cargando...</span>
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => handlePausarNoticia(noticia.id)}
                  >
                    Continuar
                  </Button>
                )}
                <button
                  onClick={() => setSmShowPause(false)}
                  className="btn btn-danger asd"
                >
                  Cancelar
                </button>
              </div>
            </h5>
          </div>
        </Modal.Body>
      </Modal>
    </>
  ) : (
    ""
  );
}
