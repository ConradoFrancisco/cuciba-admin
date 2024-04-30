import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { NewsInstance } from "services/NewsServices";

export default function NewsTitleForm() {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("* El titulo es requerido"),
    }),
    onSubmit: async (values) => {
      await NewsInstance.create(values.title);
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
        <Button variant="primary" type="submit" className="btn-sm mt-4">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
