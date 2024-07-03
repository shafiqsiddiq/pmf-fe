import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogsCount from "./BlogsCount";
import BlogsListDetail from "./BlogsList";
import RecentBlogs from "./RecentBlogs";
import TotalBlogs from "./TotalBlogs";
import TotalUsers from "./TotalUsers";

export default function Dashboard() {
  return (
    <>
      <Row className="">
     
       
          <BlogsCount />
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <TotalUsers />
        </Col>
        {/* <Col md={6}>
          <TotalBlogs />
        </Col> */}
      </Row>
      {/* <Row className="mt-3">
        <Col md={6}>
          <TotalUsers />
        </Col>
        <Col md={6}>
          <TotalBlogs />
        </Col>
      </Row>
      <Row className="">
        <Col md={9}>
          <RecentBlogs />
        </Col>
        <Col md={3} className="sm-mt-3 ps-0">
          <BlogsListDetail />
        </Col>
      </Row> */}
    </>
  );
}
