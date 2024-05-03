import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Button, Col, Row, Form } from "react-bootstrap";
import TinymceEditor from "components/common/TinymceEditor";
import Flex from "components/common/Flex";
import { FaSave } from "react-icons/fa";
import cloudUpload from "assets/img/icons/cloud-upload.svg";
import { } from 'react-tag-input'
import { render } from 'react-dom';
/* import { COUNTRIES } from './countries'; */
import './style.css';
import { WithContext as ReactTags } from 'react-tag-input';

/* const suggestions = COUNTRIES.map(country => {
  return {
    id: country,
    text: country
  };
}); */

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function NewsEditForm({ noticia }) {
  const [tags, setTags] = React.useState([

  ]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
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
    tags: Yup.string().required("Las etiquetas son requeridas"),
  });
  console.log(noticia)
  const formik = useFormik({
    initialValues: {
      category: "",
      tags: "",
      content: noticia && noticia.body ? noticia.body : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Valores del formulario:", values);
    },
  });
  useEffect(() => {
    if (noticia && noticia.body) {
      formik.setValues({
        ...formik.values,
        content: noticia.body
      });
    }
  }, [noticia]);
  const files = imagePreviews.map((file, key) => (
    <>
      <div className="d-flex" style={{ flexDirection: "column" }}>
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

  return (
    noticia ? (<><Form onSubmit={formik.handleSubmit}>
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
                formGroup: 'form-group'
              }}
              tags={tags}
              /* suggestions={suggestions} */
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="top"
              placeholder="Presiona enter para guardar una nueva etiqueta"
              autocomplete
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.tags}
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
            <div {...getRootProps({ className: "dropzone-area py-6" })}>
              <input {...getInputProps()} />
              <Flex justifyContent="center">
                <img src={cloudUpload} alt="" width={25} className="me-2" />
                <p className="fs-9 mb-0 text-700">Drop your files here</p>
              </Flex>
            </div>
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
          <Button type="submit">
            <FaSave className="me-2" />
            Guardar Cambios
          </Button>
        </Col>
      </Row>
    </Form></>) : ''
  );
}
