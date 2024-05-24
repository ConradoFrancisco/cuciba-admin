import ModalContent from "MyApp/pages/institucional/components/ModalContent";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { CiPause1 } from "react-icons/ci";
import {
  FaEdit,
  FaPlay,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaTrash,
} from "react-icons/fa";



export default function MyTableComponent({ data, filterObject,columns, }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  const { setOrderBy, setOrderDirection, setoffset, orderDirection, orderBy } =
    filterObject;
  const getOrderIcon = (column) => {
    if (orderBy === column) {
      if (orderDirection === "asc") {
        return <FaSortUp />;
      } else if (orderDirection === "desc") {
        return <FaSortDown />;
      }
    }
    return <FaSort />;
  };
  const handleOrderBy = (column) => {
    setoffset(0);
    if (orderBy === column) {
      if (orderDirection === "") {
        setOrderDirection("asc");
      } else if (orderDirection === "asc") {
        setOrderDirection("desc");
      } else {
        setOrderDirection("");
        setOrderBy("");
      }
    } else {
      setOrderBy(column);
      setOrderDirection("asc");
    }
  };
  const handleOpenModal = (action, area = null) => {
    setSelectedArea(area);
    setModalAction(action);
    setOpenModal(true);
  };
  return (
    <>
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          {columns.map((column, key) => (
            <th onClick={() => handleOrderBy(column)}>
              {column} {getOrderIcon(column)}
            </th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column)=>{
                return(
                    column === "estado" ? "" :<td>{item[column]}</td>
                )    
            })}
            <td>
              <span
                className="badge"
                style={{
                  backgroundColor: item.estado === 1 ? "green" : "red",
                  color: "white",
                }}
              >
                {item.estado === 1 ? "Activa" : "Inactiva"}
              </span>
            </td>
            <td className="d-flex justify-content-around">
              <button
                className={`btn btn-${
                  item.estado === 1 ? "secondary" : "success"
                } btn-sm mr-2`}
                onClick={
                  item.estado === 1
                    ? () => handleOpenModal("desactivar", item)
                    : () => handleOpenModal("activar", item)
                }
              >
                {item.estado === 1 ? <CiPause1 /> : <FaPlay />}
              </button>
              <button
                className="btn btn-primary btn-sm mr-2"
                onClick={() => handleOpenModal("editar", item)}
              >
                <FaEdit size={18} />
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleOpenModal("eliminar", item)}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Modal size="lg" show={openModal}>
        <ModalContent
          area={selectedArea}
          tipo={modalAction}
          flag={filterObject.flag}
          setFlag={filterObject.setFlag}
          setOpenModal={setOpenModal}
        />
      </Modal>
    </>
  );
}