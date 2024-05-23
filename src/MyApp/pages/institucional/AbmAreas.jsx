import AdvanceTable from "MyApp/components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "MyApp/components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "MyApp/components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "MyApp/components/common/advance-table/AdvanceTableWrapper";
import FalconCloseButton from "components/common/FalconCloseButton";
import PageHeader from "components/common/PageHeader";
import { useEffect, useState } from "react";
import { Accordion, AccordionBody, Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { CiPause1 } from "react-icons/ci";
import { FaCheck, FaEdit, FaPlay, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import AreasInstance from "services/institucional/AreaService";
import Areaform from "./forms/AreaForm";
import ModalContent from "./components/ModalContent";

export default function AbmAreas() {
  const [input,setInput] = useState("")
  const [inputValue, setInputValue] = useState("");
  const [limit,setLimit] = useState(5);
  const [offset,setoffset] = useState(0);
  const [total,setTotal] = useState()
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
  const handlesubmit = (e) =>{
    e.preventDefault();
    console.log("enviado")
    setoffset(0)
    setInputValue(input)
  }
  const clearFilters = () =>{
    setInputValue("")
  }
  const handleInput = (e) =>{
    setInput(`%${e.target.value}%`)
  }
  const handleChange = (e) =>{
    setoffset(0)
    setLimit(parseInt(e.target.value))
  }
  
  useEffect(() => {
    const FetchAreas = async () => {
      try {
        const response = await AreasInstance.getAll({limit,offset,input});
        console.log(response)
        setTotal(response.data.total[0].total)
        setData(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    FetchAreas();
  }, [flag,limit,offset,inputValue]);
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
        <Card>
          <Accordion className="rounded">
            <Accordion.Header className="rounded">
              Filtros
            </Accordion.Header>
            <AccordionBody>
              <Form onSubmit={handlesubmit}>
                <Row>
                  <Col xl={3}>
                    <Form.Group>
                      <Form.Label>
                       Título
                      </Form.Label>
                      <Form.Control onChange={handleInput}/>
                    </Form.Group>
                  </Col>
                  <Col xl={3}>
                    <Form.Group>
                      <Form.Label>
                       Orden
                      </Form.Label>
                      <Form.Control type="number"/>
                    </Form.Group>
                  </Col>
                  <Col xl={2}>
                    <Form.Group>
                      <Form.Label>
                       Estado
                      </Form.Label>
                      <Form.Select>
                          <option value="">Todas</option>
                          <option value={1}>Activas</option>
                          <option value={0}>Inactivas</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xl={2} className="mt-4">
                    <Button variant="primary" className="w-100" type="submit">Enviar</Button>
                  </Col>
                  <Col xl={2} className="mt-4">
                    <Button onClick={clearFilters} variant="secondary" className="w-100">Limpiar filtros</Button>
                  </Col>
                </Row>
              </Form>
            </AccordionBody>
          </Accordion>
        </Card>
          <Card className="p-4 mt-4">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Orden</th>
                  <th style={{width:'65%'}}>Título</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.orden}</td>
                    <td>{item.title}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: item.estado === 1 ? 'green' : 'red',
                          color: 'white'
                        }}
                      >
                        {item.estado === 1 ? "Activa" : "Inactiva"}
                      </span>
                    </td>
                    <td className="d-flex justify-content-around">
                      <button className={`btn btn-${item.estado === 1 ? 'secondary' : 'success'} btn-sm mr-2`} onClick={item.estado === 1 ? ()=>handleOpenModal('desactivar',item) : ()=>handleOpenModal('activar',item)}>
                        {item.estado === 1 ? <CiPause1 /> : <FaPlay />}
                      </button>
                      <button className="btn btn-primary btn-sm mr-2"  onClick={()=>handleOpenModal('editar',item)}>
                      <FaEdit size={18} />
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={()=>handleOpenModal('eliminar',item)}>
                      <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col-6 gap-2 d-flex">
                <span>mostrando de {offset + 1 } - {(limit + offset) > total ? total : limit + offset} resultados de: {total}</span>
                <select name="" id="" onChange={handleChange}>
                  
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
              <div className="col-6 gap-2 d-flex justify-content-end">
                <Button type="button" variant="primary" disabled={offset === 0 ? true : false}onClick={()=> setoffset(offset-limit)}>Anterior</Button>
                <Button type="button" variant="primary" disabled={(limit + offset) > total ? true : false} onClick={()=> setoffset(offset+limit)}>Siguiente</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal size="lg" show={openModal}>
        <ModalContent area={selectedArea} tipo={modalAction} flag={flag} setFlag={setFlag} setOpenModal={setOpenModal} />
      </Modal>

    </>
  );
}
