import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  MdFilterAlt,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

import BootstrapTable from "react-bootstrap-table-next";
export default function RecentBlogs() {
  const [countYear, setcountYear] = useState(2023);

  const columns = [
    {
      text: "No",
      dataField: "id",
      headerStyle: {
        verticalAlign: "middle",
      },
      formatter: (row) => {
        return (
          <>
            <p className="mb-0 table-id-styling">{row}</p>
          </>
        );
      },
      sort: true,
    },
    {
      text: "Blog Title",
      dataField: "blogTitle",
      align: "left",
      headerAlign: "left",
      headerStyle: {
        width: "200px",
      },
      formatter: (row) => {
        return (
          <div className="d-flex align-items-center">
            <p className="mb-0 table-userName-styling"></p>
            <span className="ms-2">{row} </span>
          </div>
        );
      },
      sort: true,
    },
    // {
    //   text: "Blog Type",
    //   dataField: "blogType",
    //   headerAlign: "left",
    //   selector: (row) => row.blogType,
    //   sort: true,
    // },
    {
      text: "Posted Date",
      dataField: "pstedDate",
      selector: (row) => row.pstedDate,
      sort: true,
    },

    {
      text: "Category",
      dataField: "company",
      headerAlign: "left",
      sort: true,
      formatter: (row) => CategoryFunction(row),
    },
    // {
    //   text: "Comment",
    //   dataField: "Comment",
    //   sort: true,
    //   headerAlign: "center",
    //   align: "center",
    //   selector: (row) => row,
    // },
    // {
    //   text: "Viewers",
    //   dataField: "viewers",
    //   align: "center",
    //   headerAlign: "center",
    //   sort: true,
    //   selector: (row) => row,
    // },
  ];
  const products = [
    {
      id: 1,
      blogTitle: "IpadOS 15 Bawa fitur Baru",
      blogType: "John@abc.com",
      pstedDate: "07 Dec 2023",
      viewers: "300k",
      totalBlog: "20/month",
      company: "Health",
      Comment: "30",
    },
    {
      id: 2,
      blogTitle: "IpadOS 15 Bawa fitur Baru",
      blogType: "John@abc.com",
      pstedDate: "07 Dec 2023",
      viewers: "300k",
      company: "Health",
      Comment: "20",
    },
    {
      id: 3,
      blogTitle: "IpadOS 15 Bawa fitur Baru",
      blogType: "John@abc.com",
      pstedDate: "07 Dec 2023",
      viewers: "300k",
      company: "Health",
      Comment: "40",
    },
  ];
  return (
    <Card className=" border-0">
      <Card.Body className="">
        <Row className="mb-3">
          <Col lg={12} className="total-user-component">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
              <h5 className="generic-heading-level-2 generic-theme-color ">
                Recent Blogs
              </h5>
              <p className="mb-0">
                {" "}
                <MdKeyboardArrowLeft
                  className="me-2 cursor mb5px"
                  onClick={() => setcountYear(countYear - 1)}
                />
                {countYear}{" "}
                <MdKeyboardArrowRight
                  className="ms-2 cursor mb5px"
                  onClick={() => setcountYear(countYear + 1)}
                />
              </p>
              <div className="d-flex ">
                <div className="cursor-pointer text-black">
                  <MdFilterAlt />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="recent-blogs table-responsive">
          <BootstrapTable
            className=""
            bootstrap4
            noDataIndication={"No Record Found"}
            keyField="id"
            data={products}
            columns={columns}
          />
        </Row>
      </Card.Body>
    </Card>
  );
}
const CategoryFunction = (row) => {
  return (
    <div className="">
      {row === "Technology" ? (
        <p
          className={`mb-0  p-1 text-white`}
          style={{ backgroundColor: "#FAC670", borderRadius: "4px" }}
        >
          {row}
        </p>
      ) : row === "Health" ? (
        <p
          className={`mb-0 p-1 text-white`}
          style={{ backgroundColor: "#45B9B9", borderRadius: "4px" }}
        >
          {row}
        </p>
      ) : row === "Entertainment" ? (
        <p
          className={`mb-0 p-1 text-white`}
          style={{ backgroundColor: "#83E181", borderRadius: "4px" }}
        >
          {row}
        </p>
      ) : null}
    </div>
  );
};
