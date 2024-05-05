import { Button, Spinner } from "react-bootstrap";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { NewsInstance } from "services/NewsServices";
import IconButton from "components/common/IconButton";
import React from "react";
import { Link } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

export default function NewsTitleForm({ setData, closeModal,settotalResults,limit }) {
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
        const response = await NewsInstance.create(values.title);
        if (response.statusCode === 200){
          toast.success("Se creó la noticia satisfactoriamente \n puedes editarla ahora", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style:{color:'#fff',fontWeight:'500'} // Añade un borde al texto}
            
          });
        }
        closeModal();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }

      try {
        let response;
        if(limit !== null){
          response = await NewsInstance.getAll({limit:limit})
        }else{
          response = await NewsInstance.getAll({})
        }
        setData(response.results)
        settotalResults(response.totalResults)
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
          isInvalid={formik.touched.title && formik.errors.title} 
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
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
