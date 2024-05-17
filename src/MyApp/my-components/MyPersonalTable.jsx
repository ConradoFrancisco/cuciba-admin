import { Table } from "react-bootstrap";
import MyTableRow from "./MyTableRow";
import MyTablePersonalRow from "./MyTablePersonalRow";

export default function MyPersonalTable({ data }) {
  return (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Área</th>
          <th scope="col">Puesto</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Mail</th>
          <th className="text-end" scope="col">
            acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((area, key) =>
          area.workers.map((worker) => {
            return (
              <MyTablePersonalRow data={worker} area={area.title} key={key} />
            );
          })
        )}
      </tbody>
    </Table>
  );
}
