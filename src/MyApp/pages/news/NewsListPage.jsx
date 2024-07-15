import PageHeader from "components/common/PageHeader";
import React, { useRef, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { useUser } from "MyApp/context/AuthProvider";
import { NewsInstance } from "services/NewsServices";
import useService from "hooks/useService";
import { Link } from "react-router-dom";
import NewListItem from "./components/NewListItem";
import Paginator from "MyApp/my-components/Paginator";
import NewsFilterForm from "./components/NewsFilterForm";

export default function NewsListPage() {
  const [open,setOpen] = useState(false)
  const tituloRef = useRef();
  const { filterObject } = useService({ service: NewsInstance.getAll })

  const { data,setFlag,flag,total,offset,setoffset,setLimit,limit,setEstado,setOrden,setInput } = filterObject
  const formFilterObject = {
    setoffset,
    setInput,
    setEstado,
    setOrden,
  };

  const handleCreateNoticia = async () =>{
    const titulo = tituloRef.current.value
    try{
      const result = await NewsInstance.create({titulo})
      console.log(result)
      const newflag = flag + 1;
      setFlag(newflag)
    }catch(e){
      console.error(e)
    }finally{
      setOpen(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Listado de noticias"
        className="mb-3"
      >
       <Button onClick={()=>setOpen(true)} variant="primary"><FiPlus></FiPlus> Agregar noticia</Button> 
      </PageHeader>
      <Row>
        <Col xl={2}>
        <Card className="p-2">

         <NewsFilterForm formFilterObject={formFilterObject}/>
        </Card>
        </Col>
        <Col xl={10}>
          {data?.map((item) => (
            <>
              <NewListItem item={item} flag={flag} setFlag={setFlag}/>
            </>
          ))}
        <Paginator limit={limit} offset={offset} setLimit={setLimit} setOffset={setoffset} total={total} />
        </Col>
      </Row>
      <Modal show={open}>
          <Modal.Header>
            Agregar titulo de noticia
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div className="form-label">
                Titulo
              </div>
                <input ref={tituloRef} type="text" className="form-control" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleCreateNoticia()} >Enviar</Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}
