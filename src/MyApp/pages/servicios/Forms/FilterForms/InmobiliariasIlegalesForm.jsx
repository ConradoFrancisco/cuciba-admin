import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import InmobiliariasIlegalesServices from "services/servicios/InmobiliariasIlegalesServices";
import * as yup from "yup";

export default function InmobiliariasIlegalesForm({
  tipo,
  item,
  flag,
  setFlag,
  setOpenModal,
}) {
  const inmobiliariaIlegalSchema = yup.object().shape({
    nombre: yup.string().required("el nombre es requerido"),
    direccion: yup.string().required("la direccion es requerida"),
    fecha: yup.date().required("la fecha es requerida"),
  });

  const [loading, setLoading] = useState(false);
  const metodo =
    tipo === "editar"
      ? InmobiliariasIlegalesServices.update
      : InmobiliariasIlegalesServices.create;

  const initialValues =
    tipo === "editar"
      ? {
          id: item.id,
          nombre: item.nombre,
          direccion: item.direccion,
          fecha: item.fecha,
          penal: false,
        }
      : {
          nombre: "",
          direccion: "",
          fecha: "",
          penal: false,
        };

  const formik = useFormik({
    initialValues,
    context: { tipo },
    validationSchema: inmobiliariaIlegalSchema,
    onSubmit: async (values) => {
      console.log(values)
      setLoading(true);
      const { nombre, direccion, fecha, id, penal } = values;
      try {
        const result = await metodo({
          nombre,
          direccion,
          fecha,
          id,
          penal,
        });
        console.log(result);
        toast.success(result.data, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { color: "#fff", fontWeight: "500" },
        });
      } catch (e) {
        console.log(e);
      } finally {
        setOpenModal(false);
      }
      const newflag = flag + 1;
      setFlag(newflag);
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Nombre de fantasía:</Form.Label>
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

        <Col xs={12} md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={formik.values.direccion}
              name="direccion"
              value={formik.values.direccion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.direccion && formik.touched.direccion}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.direccion}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} md={6} className="mb-2">
          <Form.Group>
            <Form.Label>fecha:</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formik.values.fecha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.fecha && formik.touched.fecha}
            ></Form.Control>
            <Form.Control
              type="date"
              className="d-none"
              value={formik.values.penal}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.fecha}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="text-center mt-4">
          <button type="submit" className="btn w-100 btn-success">
            {tipo === "añadir" ? "Crear" : "Guardar Cambios"}
          </button>
        </Col>
      </Row>
    </Form>
  );
}
