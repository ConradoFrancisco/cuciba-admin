import { useEffect, useState } from "react";

export default function useService({ offset = 0, limit, service, filter }) {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        if (filter) {
          response = await service(offset, limit, filter);
        } else {
          response = await service(offset, limit);
        }
        setResponse(response.results);
        setError(null); // Restablecer el estado de error si la solicitud es exitosa
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error); // Establecer el estado de error si ocurre un error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, limit, filter]); // Ejecutar efecto nuevamente cuando cambien los parámetros

  return { response, loading, error }; // Devolver el estado de error
}