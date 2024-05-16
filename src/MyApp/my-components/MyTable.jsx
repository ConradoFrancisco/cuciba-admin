import { Table } from "react-bootstrap";
import MyTableRow from "./MyTableRow";

export default function MyTable({ data }) {
  return (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Puesto</th>
          <th scope="col">Estado</th>
          <th className="text-end" scope="col">
            acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((autoridad, key) => (
          <MyTableRow data={autoridad} key={key} />
        ))}
      </tbody>
    </Table>
  );
}
