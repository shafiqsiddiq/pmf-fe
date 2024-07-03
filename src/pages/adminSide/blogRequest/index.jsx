import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import BlogList from "./BlogList";

export default function BlogRequest() {
  const [countBackground, setcountBackground] = useState(0);
  const [blogsBackground, setBlogsBackground] = useState(0);
  return (
    <div>
      {/* <Row className="mb-sm-0 mb-xs-0">
        <Col md={3} sm={12} className="mb-sm-3 ">
          <Card
            className={`${
              blogsBackground === 0
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setBlogsBackground(0);
              setcountBackground(0);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Total</p>
              <p
                className={`${
                  countBackground === 0
                    ? "bg-cutom-color mb-0 p-1 rounded"
                    : "bg-light mb-0 p-1 rounded"
                } card-internal-heading`}
              >
                300
              </p>
            </div>
          </Card>
        </Col>
        <Col md={3} sm={12} className="mb-sm-3">
          <Card
            className={`${
              blogsBackground === 1
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setBlogsBackground(1);
              setcountBackground(1);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Delivered</p>
              <p
                className={`${
                  countBackground === 1
                    ? "bg-cutom-color mb-0 p-1 rounded"
                    : "bg-light mb-0 p-1 rounded"
                } card-internal-heading`}
              >
                128
              </p>
            </div>
          </Card>
        </Col>
        <Col md={3} sm={12} className="mb-sm-3">
          <Card
            className={`${
              blogsBackground === 2
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setBlogsBackground(2);
              setcountBackground(2);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Pending</p>
              <p
                className={`${
                  countBackground === 2
                    ? "bg-cutom-color mb-0 p-1 rounded"
                    : "bg-light mb-0 p-1 rounded"
                } card-internal-heading`}
              >
                145
              </p>
            </div>
          </Card>
        </Col>
        <Col md={3} sm={12} className="mb-sm-3 ">
          <Card
            className={`${
              blogsBackground === 3
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setBlogsBackground(3);
              setcountBackground(3);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Rejected</p>
              <p
                className={`${
                  countBackground === 3
                    ? "bg-cutom-color mb-0 p-1 rounded"
                    : "bg-light mb-0 p-1 rounded"
                } card-internal-heading`}
              >
                100
              </p>
            </div>
          </Card>
        </Col>
      </Row> */}
      <BlogList />
    </div>
  );
}
