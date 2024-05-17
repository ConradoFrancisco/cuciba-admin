import CardDropdown from "MyApp/components/common/CardDropdown";

import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MyTablePersonalRow({ data, area }) {
  return (
    <tr className="align-middle">
      <td className="text-nowrap">{data.name}</td>
      <td className="text-nowrap">{area.slice(0, 35)}</td>
      <td className="text-nowrap">{data.position?.slice(0, 35)}</td>
      <td className="text-nowrap">{data.phone ? data.phone : "-"}</td>
      <td className="text-nowrap">{data.email ? data.email : "-"}</td>

      <td className="text-end">
        <CardDropdown>
          <div className="py-2">
            <Dropdown.Item
              as={Link}
              to={`/institucional/personal/editar/${data.id}`}
            >
              Editar
            </Dropdown.Item>
            <Dropdown.Item className="text-danger">Eliminar</Dropdown.Item>
          </div>
        </CardDropdown>
      </td>
    </tr>
  );
}
