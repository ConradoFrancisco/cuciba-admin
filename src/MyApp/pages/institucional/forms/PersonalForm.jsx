import axiosInstance from "MyApp/utils/axiosConfig";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import PersonalInstance from "services/institucional/PersonalService";
import * as yup from "yup";
const personalSchema = yup.object().shape({
  nombre: yup.string().required("el nombre es requerido"),
  apellido: yup.string().required("el apellido es requerido"),
  telefono: yup.string(),
  email: yup.string().email(),
  cargo: yup.string().required("el cargo es requerido"),
  area: yup.number().required("el area es requerida"),
});
export default function PersonalForm({
  tipo,
  item,
  flag,
  setFlag,
  setOpenModal,
}) {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const metodo =
    tipo === "editar" ? PersonalInstance.update : PersonalInstance.create;
  const initialValues =
    tipo === "editar"
      ? {
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido,
          telefono: item.telefono,
          email: item.email,
          cargo: item.cargo,
          area: item.area_id,
        }
      : {
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          cargo: "",
          area: "-",
        };


  const formik = useFormik({
    initialValues,
    validationSchema: personalSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
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

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/areas/select"
        );
        setAreas(response.data);
      } catch (e) {
        console.error("hubo un problema con la obtencion de datos");
      }
    };
    fetchAreas();
  }, []);

  return (
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
        <Col xl={6} className="mb-2">
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
            <Form.Label>Telefono:</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.telefono && formik.touched.telefono}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.telefono}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xl={6} className="mb-2">
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.email && formik.touched.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xl={6} className="mb-2">
          <Form.Group>
            <Form.Label>Cargo:</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={formik.values.cargo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.cargo && formik.touched.cargo}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.cargo}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xl={6} className="mb-2">
          <Form.Group>
            <Form.Label>Área:</Form.Label>
            <Form.Select
              defaultValue={formik.values.area}
              name="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.area && formik.touched.area}
            >
              <option value="-">-</option>
              {areas.map((area) => (
                <option
                  key={area.id}
                  value={area.id}
                  selected={formik.values.area === area.id}
                >
                  {area.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xl={4} className="mt-4">
          <button type="submit" className="btn btn-success">
            {tipo === "añadir" ? "Crear" : "Guardar Cambios"}
          </button>
        </Col>
      </Row>
    </Form>
  );
}
