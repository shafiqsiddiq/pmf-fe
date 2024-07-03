import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { MdFilterAlt } from "react-icons/md";
import BlogList from "../blogRequest/BlogList.jsx";

export default function BlogRequest() {
  return (
    <div>
      <Row className="my-3 px-2">
        <Col lg={12}>
          <div className="d-flex flex-wrap justify-content-between align-items-center ">
            <h5 className="mb-0">Previous Requested Blogs</h5>
            <div className="d-flex ">
              <Form.Group className="me-2">
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Search Users"
                />
              </Form.Group>
              <div className="filter-btn d-flex align-items-center view-all-button cursor-pointer text-white">
                <MdFilterAlt />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <BlogList />
    </div>
  );
}
