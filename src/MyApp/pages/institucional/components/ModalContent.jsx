import FalconCloseButton from "MyApp/components/common/FalconCloseButton";
import { Button, Modal } from "react-bootstrap";
import AreasInstance from "services/institucional/AreaService";
import Areaform from "../forms/AreaForm";
import { useEffect } from "react";

export default function ModalContent({
  AddFormComponent,
  setActiveFunction, deleteFunction,
  tipo,
  item,
  flag,
  setFlag,
  setOpenModal,
}) {
  console.log(tipo)
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
      console.log(response);
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
            <h5>
              <FalconCloseButton onClick={() => setOpenModal(false)} />
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <h5>
                Ustéd esta a punto de activar el área '{item.title}' ¿Desea
                proseguir?
              </h5>
              <div className="d-flex justify-content-center gap-3 pt-3">
                <Button
                  variant="success"
                  onClick={() => handleActivateArea(item.id, 1)}
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
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <h5>
                Ustéd esta a punto de eliminar el área '{item.title}' ¿Desea
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
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <h5>
                Ustéd esta a punto de desactivar el área '{item.title}' ¿Desea
                proseguir?
              </h5>
              <div className="d-flex justify-content-center gap-3 pt-3">
                <Button
                  variant="success"
                  onClick={() => handleDeactivateArea(item.id, 0)}
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
            <h5>Añadir nueva área</h5>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            {AddFormComponent}
          </Modal.Body>
        </>
      ) : tipo === "editar" ? (
        <>
          <Modal.Header>
            <h5>actualizar area</h5>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <AddFormComponent
              tipo={tipo}
              area={item}
              setOpenModal={setOpenModal}
              flag={flag}
              setFlag={setFlag}
            ></AddFormComponent>
          </Modal.Body>
        </>
      ) : (
        ""
      )}
    </>
  );
}
