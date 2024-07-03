import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { MdFilterAlt, MdOutlineEdit } from "react-icons/md";
import { FcApproval, FcCancel } from "react-icons/fc";
import { AiOutlineEye, AiOutlineSearch } from "react-icons/ai";
import { IoIosCreate, IoMdCreate, IoMdDocument } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BlogChangestatusAction,
  getAllUserAction,
  getAllUserWithoutLoginIdAction,
  getAllTasksAction,
} from "../../../redux/actions/userAction";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddUserModal from "../users/AddUserModal";
import { ScaleLoader } from "react-spinners";
export default function BlogList() {
  const [userModal, setUserModal] = useState(false);
  let dispatch = useDispatch();
  const getallBlogsRequests = useSelector((state) => state.user);

  const userData = JSON.parse(localStorage.getItem("pms_user"));
  useEffect(() => {
    
    let req = {
      firstName: "",
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, []);
  const user = useSelector((state) => state.user);

  let userRole = user?.getUserNoLoginIdData
    ?.filter(
      (item) =>
        item?.roleId === "3" || item?.roleId === "2"
    )
    .map((filtered) => filtered);
  function onView(e) {
    e.stopPropagation();
    // setEdi
    setUserModal(true);
  }
  let navigate = useNavigate();
  const gotoGenetrateScreen = (data) => {
    // navigate(`/generate-blog/${data?.UserId}/${data?.requestId}`,
    navigate(
      {
        pathname: `/generate-blog`,
        search: `userId=${data?.login_id}&request_id=${data?._id}`,
      }

      // {
      //   // state: {
      //   //   data,
      //   // },
      // }
    );
  };
  const onSuccess = () => {
    // dispatch(getAllTasksAction());
  };
  const onStatusChange = (data, statusId) => {
    let finalData = {
      blogTitle: "this is the latest title",
      request_id: data?._id,
      status: statusId,
      blogDescription: "test",
    };

    dispatch(BlogChangestatusAction(finalData, onSuccess));
    // props?.setBlogsBackground(1);
    // props?.setcountBackground(1);
  };

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
    {
      text: "Role",
      dataField: "roleId",
      formatter: (row, item) => {
        return (
          <>
            <span>
              {row === "2" ? "Team Lead" : row === "3" ? "Resource" : "Admin"}{" "}
            </span>
          </>
        );
      },
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
  // const columns = [
  //   {
  //     text: "Title",
  //     dataField: "blogTitle",
  //     sort: true,
  //     align: "left",
  //     headerAlign: "left",
  //     headerStyle: {
  //       width: "230px",
  //     },
  //     formatter: (row) => {
  //       return (
  //         <>
  //           <span className="content-read-more">{row}</span>
  //           <span></span>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     text: " User ID",
  //     dataField: "login_id",
  //     selector: (row) => row,
  //     sort: true,
  //     align: "center",
  //     headerAlign: "center",
  //   },
  //   {
  //     text: "User Name",
  //     dataField: "userName",
  //     selector: (row) => row.email,
  //     sort: true,
  //     align: "center",
  //     headerAlign: "center",
  //   },
  //   {
  //     text: "Requested Date",
  //     dataField: "requestedDate",
  //     selector: (row) => row.phone,
  //     sort: true,
  //     align: "center",
  //     headerAlign: "center",
  //   },

  //   {
  //     text: "Status",
  //     dataField: "status",
  //     align: "center",
  //     headerAlign: "center",
  //     sort: true,
  //     formatter: (row) => {
  //       return (
  //         <>
  //           <div className="">
  //             <div className="position-relative tooltip-box">
  //               <span
  //                 className={
  //                   row === "Rejected"
  //                     ? "reject-text"
  //                     : row === "Pending"
  //                     ? "pending-text"
  //                     :row === "Approved"? "approved-text":"delivered-text"
  //                 }
  //               >
  //                 {row}
  //               </span>

  //               <div className="tooltip-reason">
  //                 {row === "Rejected"
  //                   ? "This user blog request is rejected"
  //                   : row === "Pending"
  //                   ? "Please accept the user request to write a blog for them"
  //                   : row === "Approved"
  //                   ? "Blog request has been approved, click on the create blog icon to write a blog for them"
  //                   : "This user blog request is delivered"}
  //               </div>
  //             </div>
  //           </div>
  //         </>
  //       );
  //     },
  //     left: true,
  //   },

  //   {
  //     text: "View",
  //     dataField: "view",
  //     formatter: (row) => {
  //       return (
  //         <>
  //           <button className="btn-secondry" onClick={(e) => onView(e)}>
  //             View
  //           </button>
  //         </>
  //       );
  //     },
  //     left: true,
  //   },
  // ];

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  // const expandRow = {
  //   renderer: (row) => {
  //     let minutes = row.estimatedTime;
  //     const hours = Math.floor(minutes / 60);
  //     const remainingMinutes = minutes % 60;
  //     return (
  //       <div>
  //         <h5 className="text-bold">Total Time :  <span className="result-text-style">{hours}h {remainingMinutes}m</span></h5>
  //         <h5>Project Name : <span className="result-text-style">{row.projectName}</span> </h5>
  //         <h5>Task Name : <span className="result-text-style">{row.taskName}</span> </h5>
  //         <h5>Task Status : <span className="result-text-style">{row.status}</span></h5>
  //       </div>
  //     );
  //   },
  // };
  const hanldeChange = (data) => {
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
      <Row>
        <Col lg={12}>
          <div className="d-flex  justify-content-end pb-3 ">
            {/* <h3 className="  mb-2">
              User
            </h3> */}
            <div className="d-flex">
              <Button
                data-tut="reactour__action"
                className="btn-primary border-0"
                onClick={() => setUserModal(true)}
              >
                Add Resource
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Card className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">Total Resources</h5>
                <div className="d-flex ">
                  <Form.Group className="me-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Search resource"
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
            {user?.getUserNoLoginIdLoading === true && (
              <div className="text-center ">
                {" "}
                <ScaleLoader color="#0f71b0" />
              </div>
            )}
            {user?.getUserNoLoginIdFailure === true && (
              <span className="text-danger text-center">Network Error</span>
            )}
            {user && user.getUserNoLoginIdSuccess === true && (
              <BootstrapTable
                className=""
                // bootstrap4
                keyField="_id"
                selectRow={selectRow}
                noDataIndication={"No Record Found"}
                data={userRole ? userRole : []}
                // expandRow={expandRow}
                columns={columns}
                hover
                pagination={paginationFactory(options)}
              />
            )}
          </Row>
        </Card.Body>
      </Card>
      <AddUserModal
        show={userModal}
        title="Add Resource"
        roleId="3"
        handleClose={() => setUserModal(false)}
      />
    </div>
  );
}
