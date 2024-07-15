import axiosInstance from "MyApp/utils/axiosConfig";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import RevistaCucicbaService from "services/servicios/RevistaCucicbaService";
import * as yup from "yup";

export default function RevistaForm({ tipo, item, flag, setFlag, setOpenModal }) {
  const revistaSchema = yup.object().shape({
    portada: yup
      .mixed()
      .test("portadaRequired", "La portada es requerida", function (value) {
        if (this.options.context.tipo === "editar") {
          return true;
        }
        return !!value;
      })
      .test("fileType", "Solo se permiten archivos de imagen", function (value) {
        if (this.options.context.tipo === "editar") {
          return true;
        }
        if (value) {
          return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
        }
        return true;
      }),
    archivo: yup
      .mixed()
      .test("archivoRequired", "El archivo es requerido", function (value) {
        if (this.options.context.tipo === "editar") {
          return true;
        }
        return !!value;
      })
      .test("fileType", "Solo se permiten archivos PDF", function (value) {
        if (this.options.context.tipo === "editar") {
          return true;
        }
        if (value) {
          return ["application/pdf"].includes(value.type);
        }
        return true;
      }),
    fecha: yup.date().required("La fecha es requerida"),
    descripcion: yup.string().required("La descripción es requerida"),
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target.result);
        setFieldValue("portada", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFieldValue("archivo", file);
    }
  };

  const metodo = tipo === "editar" ? RevistaCucicbaService.update : RevistaCucicbaService.create;
  const url = tipo === "editar" ? `/revista/${item.id}` : "/revista";

  const initialValues = tipo === "editar" ? {
    tipo,
    id: item.id,
    portada: item.imagen,
    archivo: item.archivo,
    fecha: item.fecha,
    descripcion: item.descripcion,
  } : {
    imagen: "",
    archivo: "",
    fecha: "",
    descripcion: "",
  };

  const formik = useFormik({
    initialValues,
    context: { tipo },
    validationSchema: revistaSchema,
    onSubmit: async (values) => {
      try {
        let portadaPath = values.portada;
        let archivoPath = values.archivo;

        if (typeof values.portada !== "string") {
          const formData = new FormData();
          formData.append("file", values.portada);
          const response = await axios.post("http://localhost:8080/api/v1/files", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 200) {
            portadaPath = response.data.filePath;
          }
        }

        if (typeof values.archivo !== "string") {
          const formData = new FormData();
          formData.append("file", values.archivo);
          const response = await axios.post("http://localhost:8080/api/v1/files", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 200) {
            archivoPath = response.data.filePath;
          }
        }

        const payload = {
          
          imagen: portadaPath,
          archivo: archivoPath,
          fecha: values.fecha,
          descripcion: values.descripcion,
        };
        console.log("payload:",payload)
        const result = await metodo(payload);
        console.log(result);

        toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { color: "#fff", fontWeight: "500" },
        });

        setFlag(flag + 1);
        setOpenModal(false);
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col xs={12} className="mb-2">
          <Form.Group>
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formik.values.fecha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.fecha && formik.touched.fecha}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.fecha}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} className="mb-2">
          <Form.Group>
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.descripcion && formik.touched.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.descripcion}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-2">
          <Form.Group>
            <Form.Label>Portada:</Form.Label>
            {(thumbnail || (item && item.portada)) && (
              <div style={{ maxWidth: "200px" }}>
                <img
                  src={thumbnail || `http://localhost:8080/${item.portada}`}
                  alt="Thumbnail"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <Form.Control
              type="file"
              name="portada"
              onChange={(event) => handleImageChange(event, formik.setFieldValue)}
              accept="image/*"
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.portada && formik.touched.portada}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.portada}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} className="mb-2">
          <Form.Group>
            <Form.Label>Archivo:</Form.Label>
            {fileName && <div>{fileName}</div>}
            <Form.Control
              type="file"
              name="archivo"
              onChange={(event) => handleFileChange(event, formik.setFieldValue)}
              accept="application/pdf"
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.archivo && formik.touched.archivo}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.archivo}
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
