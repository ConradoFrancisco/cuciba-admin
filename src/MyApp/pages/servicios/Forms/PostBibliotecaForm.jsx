import axiosInstance from "MyApp/utils/axiosConfig";
import axios from "axios";
import { id } from "date-fns/locale";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import AutoridadesPrincipalesService from "services/institucional/AutoridadesPrincipalesService";
import SancionesService from "services/servicios/SancionesService";
import bibliotecaInstance from "services/servicios/bibliotecaDigitalService";
import * as yup from "yup";

export default function PostBibliotecaForm({
  tipo,
  item,
  flag,
  setFlag,
  setOpenModal,
}) {
  const autoridadSchema = yup.object().shape({
    categoria: yup.number().required("La categoria es requerida"),
    descripcion: yup.string().required("La descripcion es requerida"),
    fecha: yup.string().required("La fecha es requerida"),
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const metodo =
    tipo === "editar" ? bibliotecaInstance.update : bibliotecaInstance.create;

  const initialValues =
    tipo === "editar"
      ? {
          id: item.id,
          descripcion: item.descripcion,
          categoria: item.categoria_id,
          pdf: item.pdf,
          fecha: item.fecha,
        }
      : {
          descripcion: "",
          categoria: "",
          pdf: "",
          fecha: "",
        };

  const formik = useFormik({
    initialValues,
    validationSchema: autoridadSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setLoading(true);
        let pdfPath = values.pdf;

        if (typeof values.pdf !== "string") {
          const formData = new FormData();
          formData.append("file", values.pdf);
          console.log(formData.get("file"));
          const response = await axios.post(
            "http://localhost:8080/files",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 200) {
            pdfPath = response.data.filePath;
          }
        }

        const { id, categoria, descripcion, fecha } = values;
        console.log(values.categoria)
        const pdf = pdfPath;
        const result = await metodo({
          id,
          categoria,
          descripcion,
          pdf,
          fecha,
        });
        const newflag = flag + 1;
        setFlag(newflag);
        toast.success("Publicacion generada exitosamente", {
          position: "bottom-right",
        });
      } catch (e) {
        console.error(e);
        toast.error("Hubo un problema al generar la sancion", {
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
        setOpenModal(false);
      }
    },
  });

  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/servicios/biblioteca-digital/categorias"
        );
        console.log(response.data);
        setCategorias(response.data);
      } catch (e) {
        console.error("hubo un problema con la obtencion de datos");
      }
    };
    fetchPuestos();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Descripcion:</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                !!formik.errors.descripcion && formik.touched.descripcion
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.descripcion}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Categoria:</Form.Label>
            <Form.Select
              name="categoria"
              value={formik.values.categoria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.categoria && formik.touched.categoria}
            >
              <option value={undefined}>-</option>
              {categorias.map((categoria) => (
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
            <Form.Control.Feedback type="invalid">
              {formik.errors.fecha}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Archivo:</Form.Label>
            <Form.Control
              className="mt-4"
              type="file"
              name="pdf"
              onChange={(event) =>
                formik.setFieldValue("pdf", event.currentTarget.files[0])
              }
              accept=".pdf,.txt"
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.pdf && formik.touched.pdf}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.pdf}
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
