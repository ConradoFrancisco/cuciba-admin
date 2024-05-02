import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Flex from "components/common/Flex";
import cloudUpload from "assets/img/icons/cloud-upload.svg";
import TinymceEditor from "MyApp/components/common/TinymceEditor";
import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { NewsInstance } from "services/NewsServices";
import { not } from "is_js";

export default function EditNewsPage() {
  const { id } = useParams();
  const [noticia,setNoticia] = useState({})
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [value, setValue] = React.useState(null);
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    const fetchNew = async () => {
      const response = await NewsInstance.getUnique(parseInt(id));
      console.log(response.results)
      setNoticia(response.results[0])
    }
    fetchNew();
  }, [])
  return (
    <>
      <Card className="p-4">
        <Form>
          <Row>
            <Col xl={12}>
              <Form.Group className="mb-3">
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={noticia.title}
                />
              </Form.Group>
            </Col>
            <Col xl={6}>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Seleciona la categoría</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xl={6}>
              <Form.Group className="mb-3">
                <Form.Label>Etiquetas</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Form.Group className="mb-3">
                <Form.Label>Contenido de la noticia</Form.Label>
                <TinymceEditor
                  value={noticia.body}
                  handleChange={(newValue) => setValue(newValue)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <div {...getRootProps({ className: "dropzone-area py-6" })}>
                <input {...getInputProps()} />
                <Flex justifyContent="center">
                  <img src={cloudUpload} alt="" width={25} className="me-2" />
                  <p className="fs-9 mb-0 text-700">
                    Arrastra aquí tus imagenes
                  </p>
                </Flex>
              </div>
              <div className="mt-3">
                {acceptedFiles.length > 0 && (
                  <>
                    <h6>Files</h6>
                    <ul>{files}</ul>
                  </>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={6} className="mt-3">
              <Button className="btn-secondary me-2">Cancelar</Button>
              <Button>
                <FaSave className="me-2" />
                Guardar Cambios
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
