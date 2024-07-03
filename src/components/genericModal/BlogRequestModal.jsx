import React from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { RiQuestionnaireFill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

export default function BlogRequestModal(props) {
  const { show, handleClose, requestBlog } = props;
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
        <Modal.Body>
          <div className="text-center">
            <RiQuestionnaireFill className="modal-request-icon-styling mb-3" />
            <h4 className="blog-modal-header mb-3">{"Reason of Rejection"}</h4>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Enter Reason"
                  as="textarea"
                  rows={3}
                />
              </Col>
            </Row>
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
              requestBlog();
              //   navigate("/generate-blog");
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
