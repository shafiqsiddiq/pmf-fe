import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import IMAGES from "../../../assets/images";

export default function BlogsListDetail() {
  const TOAT_COUNTS = [
    {
      title: "Total Users",
      totalCounts: "120",
      countsIcon: IMAGES.USER_ICON,
    },
    {
      title: "Total Users",
      totalCounts: "120",
      countsIcon: IMAGES.BOXES,
    },
    {
      title: "Total Users",
      totalCounts: "120",
      countsIcon: IMAGES.DOTS,
    },
    {
      title: "Total Users",
      totalCounts: "120",
      countsIcon: IMAGES.DOTS,
    },
  ];
  return (
    <Card className="border-0 h-100">
      <Card.Body className="  px-3 py-3">
        <Row className="mb-3">
          <Col lg={12} className="total-user-component">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
              <h5 className="  ">Total Blogs</h5>

              <div className="d-flex ">
                <div className="cursor-pointer text-black">
                  <button className="btn-primary">See All</button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {TOAT_COUNTS.map((item, index) => {
          return (
            <>
              <Row className="mb-3 mt-3">
                <Col lg={12}>
                  <div className="d-flex  justify-content-between  align-items-center ">
                    <div className="blog-user-profile mt-0 d-flex align-items-center">
                      <img
                        className="rounded-circle"
                        src={IMAGES.USER_HEADER_IMG}
                        width="31"
                        alt="Ryan Taylor"
                      />
                      <div className="ms-2 ps-1">
                        <span className="mb-1 card-internal-text">
                          Nov 20,2023
                        </span>
                        <h6 className="mb-1">Clinical use of the polymyxins</h6>
                        <div className="cursor-pointer text-black mt-2 pt-1">
                          <button className="btn-secondry px-3">View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <hr className="mb-0" />
            </>
          );
        })}
      </Card.Body>
    </Card>
  );
}
