import { Button, Spinner } from "react-bootstrap";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { NewsInstance } from "services/NewsServices";
import IconButton from "components/common/IconButton";
import React from "react";
import { Link } from "react-router-dom";
import { FaSave } from "react-icons/fa";

export default function NewsTitleForm({ setData, closeModal }) {
  const [loading, setLoading] = React.useState();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("* El titulo es requerido"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await NewsInstance.create(values.title);
        closeModal();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }

      try {
        let response = await NewsInstance.getAll();
        const mappedData = response.results.map((item) => ({
          ...item,
          acciones: (
            <>
              <div className="d-flex justify-content-around">
                <Link to={`/noticias/editar/${item.id}`}>
                  <IconButton
                    className="m-1"
                    size="sm"
                    variant="success"
                    icon="edit"
                  />
                </Link>
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="primary"
                  icon="external-link-alt"
                />
                <IconButton
                  className="m-1"
                  size="sm"
                  variant="danger"
                  icon="trash-alt"
                />
              </div>
            </>
          ),
        }));
        setData(mappedData);
        console.log(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        closeModal();
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Titulo</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Titulo de la noticia"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <span className="text-danger">
          {formik.errors.title ? <div>{formik.errors.title}</div> : null}
        </span>
        
        {loading ? (
              <Button
                variant="primary"
                size="sm"
                className="d-inline-flex flex-center mt-2"
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
              <Button type="submit" className="mt-2" size="sm">
                <FaSave className="me-2" />
                Guardar Cambios
              </Button>
            )}
        
      </Form.Group>
    </Form>
  );
}
