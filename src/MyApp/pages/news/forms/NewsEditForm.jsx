import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Button, Col, Row, Form, Spinner } from "react-bootstrap";
import TinymceEditor from "components/common/TinymceEditor";
import Flex from "components/common/Flex";
import { FaSave } from "react-icons/fa";
import cloudUpload from "assets/img/icons/cloud-upload.svg";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { WithContext as ReactTags } from "react-tag-input";
import { NewsInstance } from "services/NewsServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./validationSchemas/editValidationSchema";

export default function NewsEditForm({ noticia }) {
  const [errors, setErrors] = useState(true);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = React.useState([]);
  const [tagError, setTagError] = useState(0);
  const [fileError, setFileError] = useState(0);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    // re-render
    setTags(newTags);
  };

  const handleValidation = () => {
    let errors = 0;
    if (imagePreviews.length === 0) {
      setFileError("Debes subir al menos una imagen");
      errors++;
    }
    if (tags.length === 0) {
      setTagError("Debes poner al menos 1 etiqueta");
      errors++;
    }
    if (errors > 0) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  };

  const [imagePreviews, setImagePreviews] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const newPreviews = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setImagePreviews([...imagePreviews, ...newPreviews]);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      category: noticia && noticia.category ? noticia.category : "",
      content: noticia && noticia.body ? noticia.body : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (errors) {
        return;
      }
      const allData = {
        values,
        tags,
        imagePreviews,
      };

      try {
        setLoading(true);
        const response = await NewsInstance.edit(
          noticia.id,
          allData.imagePreviews[0].preview,
          values.title,
          values.category,
          allData.values.content,
          allData.tags,
          allData.imagePreviews
        );
        if (response.statusCode === 200) {
          console.log(response);
          toast.success("Se creó la noticia satisfactoriamente!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { color: "#fff", fontWeight: "500" }, // Añade un borde al texto}
          });
          history("/noticias/listar");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    console.log(tagError);
    if (tags) {
      tags.length > 0 || tagError === 0
        ? setTagError(null)
        : setTagError("*Debes poner al menos una etiqueta");
    }
  }, [tags]);

  useEffect(() => {
    if (noticia && noticia.title) {
      formik.setValues({
        ...formik.values,
        content: noticia.body,
        category: noticia.category,
        title: noticia.title,
      });
      noticia.tags ? setTags(noticia.tags) : setTags([]);
      setTagError(0);
      setImagePreviews(noticia.images);
      setFileError(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticia.body]);

  useEffect(() => {
    if (imagePreviews) {
      imagePreviews.length > 0 || fileError === 0
        ? setFileError(null)
        : setFileError("*Debes subir al menos una Imagen");
    }
  }, [imagePreviews]);

  const files = imagePreviews.map((file, key) => (
    <>
      <div key={key} className="d-flex" style={{ flexDirection: "column" }}>
        {key === 0 ? (
          <p className="d-inline" style={{ padding: "px" }}>
            Portada
          </p>
        ) : (
          <p>Imagen {key + 1}</p>
        )}
        <img
          className="fluid"
          style={{ objectFit: "cover", marginRight: ".4em" }}
          src={file.preview}
          alt={file.name}
          width={200}
          height={150}
        />
      </div>
    </>
  ));

  return noticia ? (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xl={12}>
            <Form.Group className="mb-3">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                name="title"
                value={formik.values.title}
                isInvalid={formik.touched.title && formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl={6}>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.category && formik.errors.category}
              >
                <option>Seleciona la categoría</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.category}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl={6}>
            <Form.Group className="mb-3">
              <Form.Label>Etiquetas</Form.Label>
              <ReactTags
                classNames={{
                  tagInputField: tagError
                    ? "ReactTags__tagInputField form-select is-invalid inputError"
                    : "ReactTags__tagInputField",
                }}
                tags={tags}
                /* delimiters={delimiters} */
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="top"
                placeholder="Presiona enter para guardar una nueva etiqueta"
                autocomplete
              />
              <Form.Control.Feedback
                type="invalid"
                className={`${tagError ? "errorTag" : ""}`}
              >
                {tagError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <Form.Group className="mb-3">
              <Form.Label>Contenido de la noticia</Form.Label>
              <TinymceEditor
                name="content"
                value={formik.values.content}
                handleChange={formik.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.content}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Adjuntar imágenes</Form.Label>
              <div
                className={`${fileError ? "inputError" : ""}`}
                {...getRootProps({
                  className: `dropzone-area py-6 ${
                    fileError ? "inputError" : ""
                  }`,
                })}
              >
                <input {...getInputProps()} />
                <Flex justifyContent="center">
                  <img src={cloudUpload} alt="" width={25} className="me-2" />
                  <p className="fs-9 mb-0 text-700">Arrastra tus fotos aquí</p>
                </Flex>
              </div>
              <Form.Control.Feedback
                type="invalid"
                className={`${fileError ? "errorTag" : ""}`}
              >
                {fileError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <div className="mt-3">
            {imagePreviews
              ? imagePreviews.length > 0 && (
                  <>
                    <h6>Imagenes adjuntadas</h6>
                    <div className="d-flex">{files}</div>
                  </>
                )
              : ""}
          </div>
        </Row>
        <Row>
          <Col xl={6} className="mt-3">
            <Button className="btn-secondary me-2">Cancelar</Button>
            {loading ? (
              <Button
                variant="primary"
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
              <Button type="submit" onClick={handleValidation}>
                <FaSave className="me-2" />
                Guardar Cambios
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </>
  ) : (
    ""
  );
}
