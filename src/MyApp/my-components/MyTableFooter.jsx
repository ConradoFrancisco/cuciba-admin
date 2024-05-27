import { Button } from "react-bootstrap";

export default function MyTableFooter({offset,limit,total,setoffset,setLimit}) {
    const handleChange = (e) => {
        setoffset(0);
        setLimit(parseInt(e.target.value));
      };

  return (
    <>
      <div className="col-6 gap-2 d-flex">
        <span>
          mostrando de {offset + 1} -{" "}
          {limit + offset > total ? total : limit + offset} resultados de:{" "}
          {total}
        </span>
        <select name="" id="" onChange={handleChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <div className="col-6 gap-2 d-flex justify-content-end">
        <Button
          type="button"
          variant="primary"
          disabled={offset === 0 ? true : false}
          onClick={() => setoffset(offset - limit)}
        >
          Anterior
        </Button>
        <Button
          type="button"
          variant="primary"
          disabled={limit + offset >= total ? true : false}
          onClick={() => setoffset(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
}
