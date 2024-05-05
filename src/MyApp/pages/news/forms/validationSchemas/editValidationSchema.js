import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
    title:Yup.string().required("*El titulo es requerido"),
    category: Yup.string().required("*La categoría es requerida"),
    content: Yup.string().required("*El contenido es requerida"),
  });