import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Button, Col, Row, Form, Spinner } from "react-bootstrap";
import TinymceEditor from "components/common/TinymceEditor";
import Flex from "components/common/Flex";
import { FaSave } from "react-icons/fa";
import cloudUpload from "assets/img/icons/cloud-upload.svg";
import {} from "react-tag-input";

import "./style.css";
import { WithContext as ReactTags } from "react-tag-input";
import { NewsInstance } from "services/NewsServices";
import { redirect } from "react-router-dom";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function NewsEditForm({ noticia }) {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = React.useState([]);
  const [tagError, setTagError] = useState(0);
  const [fileError, setFileError] = useState(0);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    console.log(tags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
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
  const validationSchema = Yup.object().shape({
    category: Yup.string().required("La categoría es requerida"),

    content: Yup.string().required("El contenido es requerida"),
  });
  const formik = useFormik({
    initialValues: {
      category: noticia && noticia.category ? noticia.category : "",
      content: noticia && noticia.body ? noticia.body : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (imagePreviews.length === 0) {
        setFileError("Debes subir al menos una imagen");
        return;
      }
      if (tags.length === 0) {
        setTagError("Debes poner al menos 1 etiqueta");
        return;
      }
      const images = imagePreviews.map((image) => image.preview);

      const allData = {
        values,
        tags,
        images,
      };

      try {
        setLoading(true);
        const response = await NewsInstance.edit(
          noticia.id,
          values.category,
          allData.values.content,
          allData.tags,
          allData.images
        );
        if (response.statusCode === 200) {
          console.log(response);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (noticia && noticia.category) {
      formik.setValues({
        ...formik.values,
        category: noticia.category,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticia]);

  useEffect(() => {
    if (noticia && noticia.body) {
      formik.setValues({
        ...formik.values,
        content: noticia.body,
      });
      setTags(noticia.tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticia.body]);
  useEffect(() => {
    console.log(noticia.id);
    tags.length > 0 || tagError === 0
      ? setTagError(null)
      : setTagError("Debes poner al menos una etiqueta");
  }, [tags]);

  useEffect(() => {
    imagePreviews.length > 0 || fileError === 0
      ? setFileError(null)
      : setFileError("Debes subir al menos una Imagen");
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
              <Form.Control type="text" name="titulo" value={noticia.title} />
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
                delimiters={delimiters}
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
                  <p className="fs-9 mb-0 text-700">Drop your files here</p>
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
            {acceptedFiles.length > 0 && (
              <>
                <h6>Imagenes adjuntadas</h6>
                <div className="d-flex">{files}</div>
              </>
            )}
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
              <Button type="submit">
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
