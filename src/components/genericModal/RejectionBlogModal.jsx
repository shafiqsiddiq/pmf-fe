import React from "react";
import { Form, Modal, Row } from "react-bootstrap";

export default function RejectionBlogModal(props) {
  const { show, handleClose } = props;

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
          <h4 className="blog-modal-header mb-3">Reason of Rejection</h4>
          <Row>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Reason of Rejection "
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-closeAndBack me-3" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              handleClose();
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
