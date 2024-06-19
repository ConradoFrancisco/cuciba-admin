import ModalContent from "MyApp/pages/institucional/components/ModalContent";
import React, { useState } from "react";
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
import { FiPlus } from "react-icons/fi";
import { format } from "date-fns";
export default function MyTableComponent({
  data,
  filterObject,
  columns,
  section,
  setActiveFunction,
  deleteFunction,
  AddFormComponent,
  formProps,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
  const handleOpenModal = (action, item = null) => {
    setSelectedItem(item);
    setModalAction(action);
    setOpenModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleOpenModal("añadir")}
        >
          <FiPlus /> Añadir {section}
        </button>
      </div>
      
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            {columns.map((column, key) => {
              let espacio = key === 0 || key === 1 ? "33%" :'';
               if(column === 'orden'){
                  espacio = "15%"
               }
               if(column === 'estado'){
                espacio = "5%"
               }
              return (
                <th
                  key={key}
                  style={{ width: espacio }}
                  onClick={() => handleOrderBy(column)}
                >
                  {column} {getOrderIcon(column)}
                </th>
              );
            })}
            <th style={{width:'12%'}}>Acciones</th>
          </tr>
        </thead>
        {data.length > 0 ? ( <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => {
                return column === "estado" ? (
                  ""
                ) : column === "fecha" ? (
                  <td>{item.fecha}</td>
                ) : (
                  <td>{item[column]}</td>
                );
              })}
              <td>
                <span
                  className="badge"
                  style={{
                    backgroundColor: item.estado === true ? "green" : "red",
                    color: "white",
                  }}
                >
                  {item.estado === true ? "Activa" : "Inactiva"}
                </span>
              </td>
              <td className="d-flex justify-content-around">
                <button
                  className={`btn btn-${
                    item.estado === true ? "secondary" : "success"
                  } btn-sm mr-2`}
                  onClick={
                    item.estado === true
                      ? () => handleOpenModal("desactivar", item)
                      : () => handleOpenModal("activar", item)
                  }
                >
                  {item.estado === true ? <CiPause1 /> : <FaPlay />}
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
        </tbody>) : (
                    <h4 className="mt-2">No hay datos que coincidan con tus busquedas</h4>
                  )}
       
      </table>
      <Modal size="lg" show={openModal}>
        {AddFormComponent ? (
          <ModalContent
            AddFormComponent={AddFormComponent}
            setActiveFunction={setActiveFunction}
            deleteFunction={deleteFunction}
            item={selectedItem}
            tipo={modalAction}
            flag={filterObject.flag}
            setFlag={filterObject.setFlag}
            setOpenModal={setOpenModal}
          />
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}
