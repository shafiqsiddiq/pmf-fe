import React from "react";
import { Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function GenerateBlogModal(props) {
  const { show, handleClose } = props;
  let navigate = useNavigate();
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
          <h4 className="blog-modal-header mb-3">Please Enter Blog Title</h4>
          <Row>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Vitamins for Health "
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Vitamins for Health "
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
              navigate("/generate-blog");
            }}
          >
            Generate
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
