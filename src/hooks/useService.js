import { useEffect, useState } from "react";

export default function useService( {service} ) {
    const [input, setInput] = useState(undefined);
    const [estado, setEstado] = useState(undefined);
    const [orden, setOrden] = useState(undefined);
    const [puesto, setPuesto] = useState(undefined);
    const [categoria, setcategoria] = useState(undefined);
    
    const [limit, setLimit] = useState(5);
    const [offset, setoffset] = useState(0);
    const [total, setTotal] = useState();
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(0);
    const [orderBy, setOrderBy] = useState(null);
    const [orderDirection, setOrderDirection] = useState("asc");

    useEffect(() => {
      const FetchData = async () => {
        try {
          const response = await service({
            area:orden,
            categoria,
            puesto,
            limit,
            offset,
            input,
            estado,
            orden,
            orderBy,
            orderDirection,
          });
          console.log(response);
          setTotal(response.data.total[0].total);
          setData(response.data.data);
        } catch (e) {
          console.error(e);
        }
      };
      FetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag, limit, offset, input, estado, orden, orderBy, orderDirection,puesto,categoria]);

    const filterObject = {
      setcategoria,
      setOrderBy,
      setOrderDirection,
      setoffset,
      orderDirection,
      orderBy,
      flag,
      setFlag,
      setInput,
      setEstado,
      setOrden,
      setPuesto,
      setData,
      setLimit,
      total,
      data,
      limit,
      offset
    };
  return { filterObject }
}