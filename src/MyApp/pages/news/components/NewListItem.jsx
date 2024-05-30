import IconButton from "MyApp/components/common/IconButton";
import FalconCloseButton from "components/common/FalconCloseButton";
import { useState } from "react";
import { Button, Card, Col, Image, Modal, Row, Spinner } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NewsInstance } from "services/NewsServices";

export default function NewListItem({ item }) {
  const EstadoCirculo = ({ estado }) => {
    const circleClass = estado ? 'green' : 'red';

    return <div className="d-flex gap-2" style={{alignItems:'center'}}>
      <span className="fw-bold" style={{color:circleClass}}>{estado ? 'Activa' : 'Inactiva'}</span>
      <span style={{ display:'inline-block', borderRadius: '50%', width: '15px', height: '15px', backgroundColor: circleClass , border:'1px solid' }}></span>
    </div>
  };
  return (
    <Card key={item.id} className="mb-4">
      <Card.Header className="d-flex gap-2 justify-content-between" style={{ borderBottom: '1px solid #f0f0f0' }}><h5>{item.title}</h5> <EstadoCirculo estado={item.estado} /> </Card.Header>
      <Card.Body className="d-flex gap-3">
        <img style={{ maxWidth: '100px' }} src={`http://localhost:8080/${item.imageUrl}`} />
        <p>{item.description}</p>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between gap-2" style={{ borderTop: '1px solid #f0f0f0' }}>
        <div><span>Fecha: {item.date}</span></div>
        <div className="d-flex gap-2">
          <Button variant={item.estado === 0 ? 'success' : 'secondary'}>
            {item.estado === 0 ? 'Publicar' : 'Pausar'}
          </Button>
          <Button variant="primary">
            Editar
          </Button>
          <Button variant="danger">
            Eliminar
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )


}
