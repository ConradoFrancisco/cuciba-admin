import FalconCloseButton from "MyApp/components/common/FalconCloseButton";
import { Button, Modal } from "react-bootstrap";
import AreasInstance from "services/institucional/AreaService";
import Areaform from "../forms/AreaForm";
import React, { useEffect } from "react";

export default function ModalContent({
  seccion,
  AddFormComponent,
  setActiveFunction,
  deleteFunction,
  tipo,
  item,
  flag,
  setFlag,
  setOpenModal,
}) {
  const cloneComponentWithProps = (component, newProps) => {
    // Clonar el componente con las nuevas props
    return React.cloneElement(component, newProps);
  };
  const formProps = {
    item,
    flag,
    setFlag,
    setOpenModal,
    tipo,
  };
  const ClonedComponent = cloneComponentWithProps(AddFormComponent, formProps);
  const handleActivateArea = async (id, estado) => {
    try {
      const response = await setActiveFunction({ id: id, estado });
      console.log(response);
      const newflag = flag + 1;
      setFlag(newflag);
    } catch (e) {
      console.error(e);
    } finally {
      setOpenModal(false);
    }
  };
  const handleDeactivateArea = async (id, estado) => {
    try {
      const response = await setActiveFunction({ id: id, estado });
      console.log(estado);
      const newflag = flag + 1;
      setFlag(newflag);
    } catch (e) {
      console.error(e);
    } finally {
      setOpenModal(false);
    }
  };

  const handleDeleteArea = async (id) => {
    try {
      const response = await deleteFunction({ id: id });
      console.log(response);
      const newflag = flag + 1;
      setFlag(newflag);
    } catch (e) {
      console.error(e);
    } finally {
      setOpenModal(false);
    }
  };
  return (
    <>
      {tipo === "activar" ? (
        <>
          <Modal.Header>
            <h5>Activar {seccion}</h5>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <h5 className="text-center">
                Ustéd esta a punto de activar el {seccion} '{item.nombre}' ¿Desea
                proseguir?
              </h5>
              <div className="d-flex justify-content-center gap-3 pt-3">
                <Button
                  variant="success"
                  onClick={() => handleActivateArea(item.id, true)}
                >
                  Continuar
                </Button>
                <Button onClick={() => setOpenModal(false)} variant="danger">
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </>
      ) : tipo === "eliminar" ? (
        <>
          <Modal.Header>
            <h5>Eliminar {seccion}</h5>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
            <h5 className="text-center">
                Ustéd esta a punto de eliminar el {seccion} '{item.nombre}' ¿Desea
                proseguir?
              </h5>
              <div className="d-flex justify-content-center gap-3 pt-3">
                <Button
                  variant="success"
                  onClick={() => handleDeleteArea(item.id)}
                >
                  Continuar
                </Button>
                <Button onClick={() => setOpenModal(false)} variant="danger">
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </>
      ) : tipo === "desactivar" ? (
        <>
          <Modal.Header>
            <h5>Desactivar {seccion}</h5>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
            <h5 className="text-center">
                Ustéd esta a punto de desactivar el {seccion} '{item.nombre}' ¿Desea
                proseguir?
              </h5>
              <div className="d-flex justify-content-center gap-3 pt-3">
                <Button
                  variant="success"
                  onClick={() => handleDeactivateArea(item.id, false)}
                >
                  Continuar
                </Button>
                <Button onClick={() => setOpenModal(false)} variant="danger">
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </>
      ) : tipo === "añadir" ? (
        <>
          <Modal.Header>
            <h5>Añadir nueva/o {seccion}</h5>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>{ClonedComponent}</Modal.Body>
        </>
      ) : tipo === "editar" ? (
        <>
          <Modal.Header>
            <h5>actualizar {seccion}</h5>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            {ClonedComponent}
          </Modal.Body>
        </>
      ) : (
        ""
      )}
    </>
  );
}
