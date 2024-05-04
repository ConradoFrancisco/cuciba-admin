import IconButton from "MyApp/components/common/IconButton";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NewListItem({noticia}){
    return (
        noticia ? (<Card className="mt-2">
        <Card.Body>
          <Row>
            <Col xs={12} sm={3}>
              <Image
                src={noticia.imageUrl}
                fluid
              />
            </Col>
            <Col xs={12} sm={6}>
              <span className="d-block fw-bold">
                {noticia.title}
              </span>
        
        
            </Col>
            <Col xs={12} sm={3}>
              <Row className="mb-3">
                <Col className="">
                  <Row>
                    <Col>
        
                    </Col>
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
              {noticia.estado === 'no publicada' ? (
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="success"
                  icon="chevron-right"
                />
              ) : (
                <IconButton className="m-1" size="sm" variant="secondary" icon="">
                  <strong>II</strong>
                </IconButton>
              )}
        
              <Link to={`/noticias/editar/${noticia.id}`}>
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="primary"
                  icon="edit"
                />
              </Link>
        
              <IconButton
                
                className="m-1 border"
                size="sm"
                variant="light"
                icon="external-link-alt"
              />
        
              <IconButton
                className="m-1"
                size="sm"
                variant="danger"
                icon="trash-alt"
              />
            </Col>
          </Row>
        </Card.Footer>
        </Card>) : ''
    )
} 