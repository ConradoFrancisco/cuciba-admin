import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import AreasInstance from "services/institucional/AreaService";
import { toast } from "react-toastify";
import { useState } from "react";
import TribunalEticaService from "services/institucional/TribunalEticaService";

const tribunalSchema = yup.object().shape({
  nombre: yup.string().required("el nombre es requerido"),
  apellido: yup.string().required("el apellido es requerido"),
  orden: yup.number().required("el orden es requerido"),
  cargo: yup.string().required("la posición es requerida"),
});

export default function Tribunalform({ setOpenModal, setFlag, flag,tipo,item }) {
  const [loading, setLoading] = useState(false);
  
  const initialValues = tipo === 'editar' ? {
    id: item.id,
    nombre: item.nombre,
    apellido: item.apellido,
    orden: item.orden,
    cargo: item.titular,
  } : {
    nombre: "",
    apellido:"" ,
    orden: "",
    cargo: "",
  };

  const metodo = tipo === 'editar' ?  TribunalEticaService.update : TribunalEticaService.create
  const formik = useFormik({
    initialValues,
    validationSchema: tribunalSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log(values)
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
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.nombre && formik.touched.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl={6}>
            <Form.Group>
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.apellido && formik.touched.apellido}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.apellido}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl={6}>
            <Form.Group>
              <Form.Label>Orden:</Form.Label>
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
          <Col xl={6}>
            <Form.Group>
              <Form.Label>Posición:</Form.Label>
              <Form.Select
                name="cargo"
                value={formik.values.cargo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.cargo && formik.touched.cargo}
              >
                <option value={undefined}>-</option>
                <option value={true}>Titular</option>
                <option value={false}>Suplente</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.cargo}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl={4} className="mt-4">
            <button type="submit" className="btn btn-success">
              {tipo ==='añadir' ? "Crear" : "Guardar Cambios"}
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
