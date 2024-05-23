import FalconCloseButton from "MyApp/components/common/FalconCloseButton";
import { Button, Modal } from "react-bootstrap";
import AreasInstance from "services/institucional/AreaService";
import Areaform from "../forms/AreaForm";
import { useEffect } from "react";

export default function ModalContent({
  tipo,
  area,
  flag,
  setFlag,
  setOpenModal,
}) {
  const handleActivateArea = async (id, estado) => {
    try {
      const response = await AreasInstance.setActive({ id: id, estado });
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
      const response = await AreasInstance.setActive({ id: id, estado });
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
      const response = await AreasInstance.delete({ id: id });
      console.log(response);
      const newflag = flag + 1;
      setFlag(newflag);
    } catch (e) {
      console.error(e);
    } finally {
      setOpenModal(false);
    }
  };

  useEffect(()=>{
    console.log(area)
  },[]
)

console.log(area)
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
                Ustéd esta a punto de activar el área '{area.title}' ¿Desea
                proseguir?
              </h5>
              <div className="d-flex justify-content-center gap-3 pt-3">
                <Button
                  variant="success"
                  onClick={() => handleActivateArea(area.id, 1)}
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
                Ustéd esta a punto de eliminar el área '{area.title}' ¿Desea
                proseguir?
              </h5>
              <div className="d-flex justify-content-center gap-3 pt-3">
                <Button
                  variant="success"
                  onClick={() => handleDeleteArea(area.id)}
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
                Ustéd esta a punto de desactivar el área '{area.title}' ¿Desea
                proseguir?
              </h5>
              <div className="d-flex justify-content-center gap-3 pt-3">
                <Button
                  variant="success"
                  onClick={() => handleDeactivateArea(area.id, 0)}
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
            <Areaform
              area={area}
              setOpenModal={setOpenModal}
              flag={flag}
              setFlag={setFlag}
            ></Areaform>
          </Modal.Body>
        </>
      ) : tipo === "editar" ? (
        <>
          <Modal.Header>
            <h5>actualizar area</h5>
            <FalconCloseButton onClick={() => setOpenModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <Areaform
              tipo={tipo}
              area={area}
              setOpenModal={setOpenModal}
              flag={flag}
              setFlag={setFlag}
            ></Areaform>
          </Modal.Body>
        </>
      ) : (
        ""
      )}
    </>
  );
}
