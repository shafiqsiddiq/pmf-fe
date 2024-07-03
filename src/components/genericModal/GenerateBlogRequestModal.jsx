import React from "react";
import { Form, Modal, Row } from "react-bootstrap";
export default function GenerateBlogRequestModal(props) {
  const { show, handleClose, generateRequestBlog } = props;
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
          <h4 className="blog-modal-header mb-3">Quantity of Blogs</h4>
          <Row>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter Quantity of Blogs"
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
              generateRequestBlog();
            }}
          >
            Submit Request
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
