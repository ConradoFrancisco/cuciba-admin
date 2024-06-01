import PageHeader from "components/common/PageHeader";
import React, { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { useUser } from "MyApp/context/AuthProvider";
import { NewsInstance } from "services/NewsServices";
import useService from "hooks/useService";
import { Link } from "react-router-dom";
import NewListItem from "./components/NewListItem";

export default function NewsListPage() {

  const { filterObject } = useService({ service: NewsInstance.getAll })

  const { data,setFlag,flag } = filterObject
  console.log(data)
 

  return (
    <>
      <PageHeader
        title="Listado de noticias"
        className="mb-3"
      >
       <Link className="btn btn-primary" to={'/noticias/añadir'} variant="primary"><FiPlus></FiPlus> Agregar noticia</Link> 
      </PageHeader>
      <Row>
        <Col xl={2}></Col>
        <Col xl={10}>
          {data?.map((item) => (
            <NewListItem item={item} flag={flag} setFlag={setFlag}/>
          ))}
        </Col>
      </Row>
    </>
  );
}
