import IconButton from "components/common/IconButton";
import React from "react";
import {
  Card,
  Row,
  Col,
  Image,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
} from "react-bootstrap";
import { FiActivity, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PropertyListItem = () => {
  const [isPublished] = React.useState(true);

  return (
    <>
      <Card className="mt-2">
        <Card.Body>
          <Row>
            <Col xs={12} sm={3}>
              <Image
                src="http://168.197.49.125:3000/images/news/noticia1.jpg"
                fluid
              />
            </Col>
            <Col xs={12} sm={6}>
              <span className="d-block fw-bold">
                Nuevo Programa de Capacitación en Bienes Raíces del Colegio
                Inmobiliario
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
                        Estado: <strong>Publicado</strong>
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
                  <strong>ID:</strong> 3345433
                </small>
              </span>
              <span className="m-1">
                <small className="text-muted">
                  <strong>Creado:</strong> Last updated 3 mins ago
                </small>
              </span>
            </Col>
            <Col className="d-flex align-items-end justify-content-end m-0">
              {!isPublished ? (
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="light"
                  icon="chevron-right"
                />
              ) : (
                <IconButton className="m-1" size="sm" variant="light" icon="">
                  <strong>II</strong>
                </IconButton>
              )}

              <IconButton
                className="m-1"
                size="sm"
                variant="light"
                icon="edit"
              />

              <IconButton
                className="m-1"
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
      </Card>
    </>
  );
};

export default PropertyListItem;
