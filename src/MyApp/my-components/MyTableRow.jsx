import CardDropdown from "MyApp/components/common/CardDropdown";
import Avatar from "components/common/Avatar";
import { Dropdown } from "react-bootstrap";

export default function MyTableRow({ data }) {
  const estado = data.estado === "Activo" ? "#00894f" : "#fde6d8";
  return (
    <tr className="align-middle">
      <td className="text-nowrap">
        <div className="d-flex align-items-center">
          {data.avatar ? (
            <Avatar src={data.avatar} size="l" name={data.name} />
          ) : (
            ""
          )}
          <div className="ms-2">{data.name}</div>
        </div>
      </td>
      <td className="text-nowrap">{data.puesto}</td>
      <td className="text-nowrap" style={{ color: estado, fontWeight: 600 }}>
        {data.estado}
      </td>
      <td className="text-end">
        <CardDropdown>
          <div className="py-2">
            <Dropdown.Item>Editar</Dropdown.Item>
            <Dropdown.Item className="text-danger">Eliminar</Dropdown.Item>
          </div>
        </CardDropdown>
      </td>
    </tr>
  );
}
