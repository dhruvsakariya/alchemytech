import React from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Redux
import { useDispatch } from "react-redux";
import { deleteProducts, setShowCheckBox } from "../tabel/reduxSlice";

const ModalPopup = ({ show, handleClose, handleShow }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteProducts({}));

    dispatch(setShowCheckBox({ value: false }));
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure ??</Modal.Title>
        </Modal.Header>
        <Modal.Body>This product will erase completely.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              dispatch(setShowCheckBox({ value: false }));
            }}
          >
            Close
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            I am Sure
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalPopup;
