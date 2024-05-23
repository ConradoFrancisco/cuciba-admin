import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import AreasInstance from "services/institucional/AreaService";
import { toast } from "react-toastify";
import { useState } from "react";

const areaSchema = yup.object().shape({
  title: yup.string().required("el titulo es requerido"),
  orden: yup.number().required("el orden es requerido"),
});

export default function Areaform({ setOpenModal, setFlag, flag,tipo,area }) {
  const [loading, setLoading] = useState(false);
  
  const initialValues = tipo === 'editar' ? {
    id: area.id,
    title: area.title,
    orden: area.orden,
  } : {
    title: "",
    orden: "",
  };

  console.log(tipo)
  const validationSchema = areaSchema;
  const metodo = tipo === 'editar' ?  AreasInstance.update : AreasInstance.create
  const formik = useFormik({
    initialValues,
    validationSchema: areaSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log("init:",initialValues)
        console.log("area:",area);
        const response = await metodo(values);
        console.log(response);
        toast.success(response.data, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { color: "#fff", fontWeight: "500" }, 
        });
        const newflag = flag + 1;
        console.log(newflag);
        setFlag(newflag);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setOpenModal(false);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xl={6}>
            <Form.Group>
              <Form.Label>Nombre del área:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.title && formik.touched.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl={6}>
            <Form.Group>
              <Form.Label>Orden del área:</Form.Label>
              <Form.Control
                type="number"
                name="orden"
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
          <Col xl={4} className="mt-4">
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
