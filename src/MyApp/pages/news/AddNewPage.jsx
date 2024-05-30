import PageHeader from "components/common/PageHeader";
import TinymceEditor from "components/common/TinymceEditor";
import { useFormik } from "formik";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { useState } from "react";
import ImageUploader from "./forms/ImageUploader";
import axios from "axios";
import { NewsInstance } from "services/NewsServices";

export default function AddNewPage() {
  const [fileError, setFileError] = useState(null);
  const [files, setFiles] = useState([]);

  const noticiaSchema = Yup.object().shape({
    titulo: Yup.string().required("El título es requerido"),
    date: Yup.date().required("La fecha es requerida"),
    orden: Yup.number().required("El orden es requerido"),
    descripcion: Yup.string().required("La descripción es requerida"),
    content: Yup.string().required("El cuerpo de la noticia es requerido"),
  });

  const initialValues = {
    titulo: "",
    date: "",
    orden: "",
    descripcion: "",
    content: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: noticiaSchema,
    onSubmit: async (values) => {

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      console.log(values)
      // Realizar la petición POST al endpoint de subida múltiple
      const response = await axios.post('http://localhost:8080/upload-multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200){
        const files = response.data.filePaths
        try{
          const result = await NewsInstance.create({body:values.content,date:values.date,description:values.descripcion,orden:values.orden,title:values.titulo})
          const id = result.data.insertId;
          const response = await NewsInstance.uploadImagesUrl({id,files})
          console.log(result.data.insertId)
        }catch(e){
          throw new Error ("error al insertar la noticia o sus imagenes")
        }
      }
      
    }
  });

  return (
    <>
      <PageHeader title='Añadir Noticia' />
      <Row className="mt-4">
        <Col xl={12}>
          <Card className="p-4">
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col xl={12}>
                  <Form.Group>
                    <Form.Label>Título:</Form.Label>
                    <Form.Control
                      name="titulo"
                      type="text"
                      value={formik.values.titulo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={!!formik.errors.titulo && formik.touched.titulo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.titulo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xl={6} className="mt-3">
                  <Form.Group>
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      name="date"
                      type="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={!!formik.errors.date && formik.touched.date}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.date}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xl={6} className="mt-3">
                  <Form.Group>
                    <Form.Label>Orden:</Form.Label>
                    <Form.Control
                      name="orden"
                      type="number"
                      value={formik.values.orden}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={!!formik.errors.orden && formik.touched.orden}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.orden}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xl={12} className="mt-3">
                  <Form.Group>
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control
                      name="descripcion"
                      type="text"
                      value={formik.values.descripcion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={!!formik.errors.descripcion && formik.touched.descripcion}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.descripcion}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xl={12} className="mt-3">
                  <Form.Group>
                    <Form.Label>Cuerpo:</Form.Label>
                    <TinymceEditor
                      handleBlur={formik.handleBlur}
                      handleChange={formik.handleChange}
                      value={formik.values.content}
                    />
                  </Form.Group>
                </Col>
                <Col xl={12} className="mt-3">
                  <ImageUploader
                    initialImages={[]}
                    setFileError={setFileError}
                    setFiles={setFiles}
                  />
                </Col>
                <Col xl={4} className="mt-4">
                  <Button variant="success" type="submit">
                    Crear noticia
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
