import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { MdFilterAlt } from "react-icons/md";
import BlogRequestModal from "../../../components/genericModal/BlogRequestModal";

export default function RejectedTable() {
  const [requestBlogModal, setRequestBlogModal] = useState(false);

  const columns = [
    {
      text: "Date",
      dataField: "requestedDate",
      selector: (row) => row.phone,
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Time",
      dataField: "timeFeeld",
      selector: (row) => row.phone,
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Reason of Rejection",
      dataField: "reasonOfRejectioon",
      selector: (row) => row.email,
      sort: true,
      align: "center",
      headerAlign: "left",
    },
  ];
  const products = [
    {
      id: 1,
      reasonOfRejectioon:
        "Your rejection letter is a reflection of your company",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
    },
    {
      id: 2,
      reasonOfRejectioon:
        "But the truth is, your rejection letter is a reflection of your company.",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
    },
    {
      id: 3,
      reasonOfRejectioon:
        "You might not think twice about a rejection letter once you send it",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
    },
    {
      id: 4,
      reasonOfRejectioon:
        "Your rejection letter is a reflection of your company",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
    },
    {
      id: 5,
      reasonOfRejectioon:
        "But the truth is, your rejection letter is a reflection of your company",
      blogTitle: "Sports AI",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Rejected",
      view: "",
    },
    {
      id: 6,
      reasonOfRejectioon:
        "But the truth is, your rejection letter is a reflection of your company",
      blogTitle: "Sports AI",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Pending",
      view: "",
    },
    {
      id: 7,
      reasonOfRejectioon:
        "But the truth is, your rejection letter is a reflection of your company",
      blogTitle: "Sports AI",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Rejected",
      view: "",
    },
    {
      id: 8,
      reasonOfRejectioon: "Rejection letter is a reflection of your company",
      blogTitle: "Sports AI",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Archived",
      view: "",
    },
    {
      id: 9,
      reasonOfRejectioon:
        "You might not think twice about a rejection letter once you send it. ",
      blogTitle: "Sports AI",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Archived",
      view: "",
    },
    {
      id: 10,
      reasonOfRejectioon:
        "You might not think twice about a rejection letter once you send it",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
    },
    {
      id: 11,
      reasonOfRejectioon:
        "You might not think twice about a rejection letter once you send it",
      timeFeeld: "10:30",
      requestedDate: "10/02/2023",
    },
  ];
  // const selectRow = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //   // onSelect:hanldeChange
  // };
  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  function requestBlog() {
    // setGenerateRequestBlogModal(true);
  }
  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">Total</h5>
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
          <Row className=" blog-table table-responsive">
            <BootstrapTable
              className=""
              bootstrap4
              noDataIndication={"No Record Found"}
              keyField="id"
              data={products}
              columns={columns}
              hover
              pagination={paginationFactory(options)}
            />
          </Row>
        </Card.Body>
      </Card>
      <BlogRequestModal
        show={requestBlogModal}
        handleClose={() => setRequestBlogModal(false)}
        title="Reject a blog"
        requestBlog={requestBlog}
      />
    </div>
  );
}
// const CategoryFunction = (row) => {
//   return (
//     <div className="">
//       {row === "Archived" ? (
//         <span>{row}</span>
//       ) : row === "Pending" ? (
//         <span>{row}</span>
//       ) : row === "Rejected" ? (
//         <span className="text-danger">{row}</span>
//       ) : null}
//     </div>
//   );
// };
