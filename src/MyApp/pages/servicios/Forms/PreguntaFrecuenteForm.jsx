import TinymceEditor from "MyApp/components/common/TinymceEditor";
import axiosInstance from "MyApp/utils/axiosConfig";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import AutoridadesPrincipalesService from "services/institucional/AutoridadesPrincipalesService";
import PreguntasFrecuentesService from "services/servicios/PreguntasFrecuentesService";
import * as yup from "yup";

export default function PreguntaFrecuenteForm({
  tipo,
  item,
  flag,
  setFlag,
  setOpenModal,
}) {
  const faQSchema = yup.object().shape({
    pregunta: yup.string().required("la pregunta es requerido"),
    categoria: yup.number().required("la categoria es requerida"),
    content: yup.string().required("la respuesta es requerido"),
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const metodo =
    tipo === "editar"
      ? PreguntasFrecuentesService.update
      : PreguntasFrecuentesService.create;

  const initialValues =
    tipo === "editar"
      ? {
        id: item.id,
        pregunta: item.pregunta,
        content: item.respuesta,
        categoria: item.categoria.id,
      }
      : {
        pregunta: "",
        content: "",
        categoria: "",
      };

  const formik = useFormik({
    initialValues,
    context: { tipo },
    validationSchema: faQSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      const { pregunta, content, categoria,id } = values;
      try {
        const result = await metodo({
          categoria:{id:categoria},
          pregunta,
          respuesta: content,
          id
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
        setOpenModal(false)
        const newflag = flag + 1;
        setFlag(newflag);
      }
    },
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await PreguntasFrecuentesService.getCategorys();
        console.log(response.data);
        setCategorias(response.data);
      } catch (e) {
        console.error("hubo un problema con la obtencion de datos");
      }
    };
    fetchCategorias();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Titulo de la Pregunta:</Form.Label>
            <Form.Control
              type="text"
              name="pregunta"
              value={formik.values.pregunta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.pregunta && formik.touched.pregunta}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.pregunta}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Categoría:</Form.Label>
            <Form.Select
              defaultValue={formik.values.categoria}
              name="categoria"
              value={formik.values.categoria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.categoria && formik.touched.categoria}
            >
              <option value="-">-</option>
              {categorias?.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.categoria}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Respuesta:</Form.Label>
            <TinymceEditor
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              value={formik.values.content}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.content}
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
