import React from "react";
import { Modal } from "react-bootstrap";
import { HiCheck } from "react-icons/hi";
// import { IoIosCheckmark } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

export default function RequestSentModal(props) {
  const { show, handleClose } = props;
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
            <HiCheck className="modal-request-sent-icon-styling mb-3" />
            <h4 className="blog-modal-header mb-3">
              {`Your request has been sent`}
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
            }}
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
