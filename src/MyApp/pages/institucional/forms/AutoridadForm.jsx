import axiosInstance from "MyApp/utils/axiosConfig";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import AutoridadesPrincipalesService from "services/institucional/AutoridadesPrincipalesService";
import * as yup from "yup";

export default function PersonalForm({
  tipo,
  item,
  flag,
  setFlag,
  setOpenModal,
}) {
  const autoridadSchema = yup.object().shape({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    cargoid: yup.number().required("El puesto es requerido"),
    orden: yup.number().required("El orden es requerido"),
    foto: yup
    .mixed()
    .test("avatarRequired", "El avatar es requerido", function (value) {
      // Verificar si el tipo es "editar" y si el campo "avatar" está vacío o es nulo
      if (this.options.context.tipo === "editar") {
        return true; // La validación pasa sin más comprobaciones
      }
      // Si no es "editar", continuar con la validación del avatar
      return !!value; // Si value es nulo o vacío, la validación falla
    })
    .test(
      "fileType",
      "Solo se permiten archivos de imagen",
      function (value) {
        // Validar el tipo de archivo si se proporciona un avatar
        if (this.options.context.tipo === "editar") {
          return true; // La validación pasa sin más comprobaciones
        }
        if (value) {
          return ["image/jpeg", "image/png", "image/gif"].includes(
            value.type
          );
        }
        // Si no se proporciona un archivo, la validación pasa automáticamente
        return true;
      }
    ),
});
  const [thumbnail, setThumbnail] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target.result);
        setFieldValue("foto", file);
      };
      reader.readAsDataURL(file);
    }
  };
console.log(item)
  const [puestos, setPuestos] = useState([]);
  const [loading, setLoading] = useState(false);
  const metodo =
    tipo === "editar"
      ? AutoridadesPrincipalesService.update
      : AutoridadesPrincipalesService.create;

  const initialValues =
    tipo === "editar"
      ? {
          tipo,
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido,
          cargoid: item.cargo.id,
          foto: item.foto,
          orden: item.orden,
        }
      : {
          nombre: "",
          apellido: "",
          cargoid: "",
          foto: null,
          orden: "",
        };

  const formik = useFormik({
    initialValues,
    context: { tipo },
    validationSchema: autoridadSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setLoading(true);
        let avatarPath = values.foto;

        if (typeof values.foto !== "string") {
          const formData = new FormData();
          formData.append("file", values.foto);
          const response = await axios.post(
            "http://localhost:8080/api/v1/files",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.status === 200) {
            console.log("entre");
            avatarPath = response.data.filePath;
            formik.setFieldValue("foto",avatarPath)
          }
        }

        const { nombre, apellido, cargoid, orden, id } = values;
        console.log(values)
        try {
          const result = await metodo({
            id,
            orden,
            nombre,
            apellido,
            cargoid,
            foto: avatarPath,
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
        }

        const newflag = flag + 1;
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
    const fetchPuestos = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/api/v1/institucional/autoridad/cargos"
        );
        console.log(response);
        setPuestos(response.data);
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
        <Col xs={12} md={6}>
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

        <Col xs={12} md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Puesto:</Form.Label>
            <Form.Select
              defaultValue={formik.values.cargoid}
              name="cargoid"
              value={formik.values.cargoid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.cargoid && formik.touched.cargoid}
            >
              <option value="-">-</option>
              {puestos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.cargoid}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Orden:</Form.Label>
            <Form.Control
              type="number"
              name="orden"
              value={formik.values.orden}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.orden && formik.touched.orden}
            ></Form.Control>

            <Form.Control.Feedback type="invalid">
              {formik.errors.orden}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Foto:</Form.Label>
            {(thumbnail || item !== null) && (
              <div style={{ maxWidth: "200px" }}>
                <img
                  src={
                    !thumbnail && tipo === "editar"
                      ? "http://localhost:8080/" + item.foto
                      : thumbnail
                  }
                  alt="Thumbnail"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <Form.Control
              className="mt-4"
              type="file"
              name="foto"
              onChange={(event) =>
                handleImageChange(event, formik.setFieldValue)
              }
              accept="image/*"
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.foto && formik.touched.foto}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.foto}
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
