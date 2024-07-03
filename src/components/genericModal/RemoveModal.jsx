import React from "react";
import { Modal } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";

export default function RemoveModal(props) {
  const { show, handleClose, title, remove } = props;
  //   let navigate = useNavigate();
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        // centered
        className="generate-blog-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="align-self-center ">
          <div className="text-center">
            <BsTrash className="modal-delete-icon-styling  mb-3" />
            <h4 className="blog-modal-header mb-3">
              {`Are you sure want to delete this ${title}`}
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-closeAndBack me-3" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn-primary w-25"
            onClick={() => {
              handleClose();
              remove();
              //   navigate("/generate-blog");
            }}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
