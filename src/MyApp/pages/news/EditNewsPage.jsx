import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { NewsInstance } from "services/NewsServices";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import PageHeader from "components/common/PageHeader";
import TinymceEditor from "components/common/TinymceEditor";
import ImageUploader from "./forms/ImageUploader";

export default function EditNewsPage() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  const [fileError, setFileError] = useState(null);
  const [images,setImages] = useState([])
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const noticiaSchema = Yup.object().shape({
    titulo: Yup.string().required("El título es requerido"),
    date: Yup.date().required("La fecha es requerida"),
    orden: Yup.number().required("El orden es requerido"),
    descripcion: Yup.string().required("La descripción es requerida"),
    content: Yup.string().required("El cuerpo de la noticia es requerido"),
  });

  const initialValues = {
    titulo: noticia?.titulo,
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
        formData.append("files", file);
      });
      console.log(values);
      // Realizar la petición POST al endpoint de subida múltiple
      const response = await axios.post(
        "http://localhost:8080/api/v1/files/multiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response)
      if (response.status === 200) {
        const files = response.data.filePaths;
        try {
          const result = await NewsInstance.update({
            id:id,
            cuerpo:values.content,
            descripcion:values.descripcion,
            titulo:values.titulo,
            fecha:values.date,
            orden:values.orden,
            imagenes : files
          });
          
          navigate("/noticias/listar");
        } catch (e) {
          console.error(e)
          throw new Error("error al insertar la noticia o sus imagenes");
        }
      }
    },
  });
  useEffect(() => {
    const fetchNew = async () => {
      try {
        const response = await NewsInstance.getByid({ id });
        console.log(response.data.titulo);
        setNoticia(response.data);
        formik.setValues({
          titulo: response.data.titulo,
        });
         /* setImages(response.data[0].imagenes.split(';')); */
        
      } catch (e) {
        console.log(e);
      }
    };
    fetchNew();
  }, []);
  return (
    <>
      <PageHeader title="Editar Noticia" />
      <Row className="mt-4">
        <Col xl={12}>
          <Card className="p-4">
            {noticia !== null ? (
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
                        isInvalid={
                          !!formik.errors.titulo && formik.touched.titulo
                        }
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
                        isInvalid={
                          !!formik.errors.orden && formik.touched.orden
                        }
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
                        isInvalid={
                          !!formik.errors.descripcion &&
                          formik.touched.descripcion
                        }
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
                      Guardar cambios
                    </Button>
                  </Col>
                </Row>
              </Form>
            ) : (
              ""
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}
