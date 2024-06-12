import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Form, Row, Button } from "react-bootstrap";
import Flex from "components/common/Flex";
import cloudUpload from "assets/img/icons/cloud-upload.svg";
import "./style.css";

const ImageUploader = ({ initialImages = [], setFileError, setFiles }) => {
  const [filePreviews, setFilePreviews] = useState(initialImages);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const newPreviews = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const files = [...filePreviews, ...newPreviews];
      setFilePreviews(files);
    },
  });

  useEffect(() => {
    setFiles(filePreviews);
    if (filePreviews.length === 0) {
      setFileError("Debes subir al menos una imagen");
    } else {
      setFileError(null);
    }
  }, [filePreviews, setFileError, setFiles]);

  const handleDeleteImage = (index) => {
    const newFilePreviews = filePreviews.filter((_, i) => i !== index);
    setFilePreviews(newFilePreviews);
  };

  const files = filePreviews.map((file, key) => (
    <div key={key} id={'este id'} className="d-flex" style={{ flexDirection: "column" }}>
      {key === 0 ? (
        <p className="d-inline" style={{ padding: "px" }}>
          Portada
        </p>
      ) : (
        <p>Imagen {key + 1}</p>
      )}
      <img
        className="fluid"
        style={{ objectFit: "cover", marginRight: ".4em" }}
        src={file.preview}
        alt={`preview-${key}`}
        width={200}
        height={150}
      />
      <Button
        variant="danger"
        onClick={() => handleDeleteImage(key)}
        className="mt-2"
      >
        Eliminar
      </Button>
    </div>
  ));

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Adjuntar imágenes</Form.Label>
        <div
          className={`${
            setFileError ? "inputError" : ""
          }`}
          {...getRootProps({
            className: `dropzone-area py-6 ${
              setFileError ? "inputError" : ""
            }`,
          })}
        >
          <input {...getInputProps()} />
          <Flex justifyContent="center">
            <img src={cloudUpload} alt="" width={25} className="me-2" />
            <p className="fs-9 mb-0 text-700">Arrastra tus fotos aquí</p>
          </Flex>
        </div>
        <Form.Control.Feedback
          type="invalid"
          className={`${setFileError ? "errorTag" : ""}`}
        >
          {setFileError}
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <div className="mt-3">
          {filePreviews.length > 0 && (
            <>
              <h6>Imágenes adjuntadas</h6>
              <div className="d-flex">{files}</div>
            </>
          )}
        </div>
      </Row>
    </>
  );
};

export default ImageUploader;