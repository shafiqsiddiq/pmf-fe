import React, { useEffect, useState } from "react";
import { Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFillArrowDownSquareFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdFilterAlt, MdOutlineEdit, MdOutlineModeEdit, MdUnarchive } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { IoMdArchive } from "react-icons/io";
import { deleterequestAction, getAllUserAction, getTaskByUserIdAction, getUserTasksAction } from "../../../redux/actions/userAction";
import { TbArchiveOff } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";
import BlogRequestModal from "../../../components/genericModal/BlogRequestModal";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "../../../components/genericActions";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

export default function BlogList() {
  const [requestBlogModal, setRequestBlogModal] = useState(false);
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("pms_user"));
  let blogRequestsData=useSelector((state)=>state?.user)
  let dispatch = useDispatch();
  useEffect(() => {
    let finalData = {
      login_id: user?.loginUser?._id
    };
    dispatch(getTaskByUserIdAction(finalData));
  }, []);
  const userReducer = useSelector((state) => state.user);

  let userRole = userReducer?.userList
    ?.filter((item) => item?.roleId === "3")
    .map((filtered) => filtered);
    const columns = [
      // {
      //   text: "Sr.No",
      //   dataField: "id",
      //   selector: (row) => row,
      //   sort: true,
      // },
      {
        text: "First Name",
        dataField: "firstName",
        selector: (row) => row,
        sort: true,
      },
      {
        text: "Last Name",
        dataField: "lastName",
        selector: (row) => row,
        sort: true,
      },
      {
        text: "Email",
        dataField: "email",
        selector: (row) => row.email,
        sort: true,
      },
      // {
      //   text: "Total Blog",
      //   dataField: "totalBlogs",
      //   sort: true,
      //   selector: (row) => row,
      // },
      // {
      //   text: "Remaining Blog",
      //   dataField: "remainingBlogs",
      //   sort: true,
      //   selector: (row) => row,
      // },
      // {
      //   text: "Status",
      //   dataField: "status",
      //   formatter: (row) => {
      //     return (
      //       <>
      //         {row === true && (
      //           <div className="status-style">
      //             <span>Active</span>
      //           </div>
      //         )}
      //         {row === false && (
      //           <div className="inactive-status-style">
      //             <span>InActive</span>
      //           </div>
      //         )}
      //       </>
      //     );
      //   },
      //   left: true,
      // },
      {
        text: "Action",
        dataField: "action",
        formatter: (row, item) => {
        
          return (
            <>
              <AiOutlineEye
              className="download-icon"
              size={20}
              // onClick={(row) => onEdit(row, item)}
            />
            </>
          );
        },
        left: true,
      },
    ];
  const products = [
    {
      id: 1,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Archived",
      view: "",
    },
    {
      id: 2,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Archived",
      view: "",
    },
    {
      id: 3,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Archived",
      view: "",
    },
    {
      id: 4,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Pending",
      view: "",
    },
    {
      id: 5,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Rejected",
      view: "",
    },
    {
      id: 6,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Pending",
      view: "",
    },
    {
      id: 7,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Rejected",
      view: "",
    },
    {
      id: 8,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Archived",
      view: "",
    },
    {
      id: 9,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Archived",
      view: "",
    },
    {
      id: 10,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Rejected",
      view: "",
    },
    {
      id: 11,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Archived",
      view: "",
    },
  ];
  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  // const selectRow = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //    onSelect:hanldeChange
  // };
  function requestBlog() {
    // setGenerateRequestBlogModal(true);
  }
  let navigate=useNavigate()
  const hanldeChange = (data) => {
     ;
    navigate("/resource-tasks", {
      state: {
        data,
      },
    });
  };
  const selectRow = {
    hideSelectColumn: true,
    clickToSelect: true,
    onSelect: hanldeChange,
  };
  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">Resources</h5>
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
              keyField="_id"
              data={userRole?userRole:[]}
              columns={columns}
           selectRow={selectRow}

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
      <div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
          size="md"
          // centered
          className="generate-blog-modal"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row>
              <div className="d-flex">
                <h5>Title:</h5>
                <p className="ms-2">Sports AI</p>
              </div>
              <div className="d-flex">
                <h5>Created Date:</h5>
                <p className="ms-2">10/02/2023</p>
              </div>
              <div className="">
                <h5 className="">Blog:</h5>
                <p className="">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
                <p className="mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
                <p className="mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
                <p className="mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
              </div>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
const CategoryFunction = (row) => {
  return (
    <div className="">
      {row === "Archived" ? (
        <span>{row}</span>
      ) : row === "Pending" ? (
        <span>{row}</span>
      ) : row === "Rejected" ? (
        <span className="text-danger">{row}</span>
      ) : null}
    </div>
  );
};
