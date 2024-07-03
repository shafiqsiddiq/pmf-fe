import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { MdFilterAlt, MdOutlineEdit, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../../assets/images";
import RemoveModal from "../../../components/genericModal/RemoveModal";
import { getAllBlogsByLoginIDAction } from "../../../redux/actions/blogsAction";
import {
  createProjectAction,
  deleteProjectAction,
  editProjectAction,
  createTaskAction,
  getAllProjectAction,
  getUserTasksAction,
} from "../../../redux/actions/userAction";
import { useForm } from "react-hook-form";
import { Notification } from "../../../components/genericActions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FieldError } from "../../../components/errorMessage/ErrorMessage";
import { ScaleLoader } from "react-spinners";
import { AiFillEdit, AiOutlineEye } from "react-icons/ai";
import CustomPagination from "../../../components/genericModal/CustomPagination";

export default function BlogList() {
  const [countBackground, setcountBackground] = useState(1);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [rowData, setrowData] = useState(1);
  const [usersBackground, setusersBackground] = useState(1);
  const [showEdit, setEditShow] = useState(false);
  const [editRow, setEditRow] = useState();
  const [teamId, setTeamId] = useState();
  const [removeId, setRemoveId] = useState();
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [data, setData] = useState('');
  const [modalEncrypt, setmodalEncrypt] = useState(false);
  const [keyValue, setkeyValue] = useState("");
  const [searchName, setsearchName] = useState("");
  const [removeBlogModal, setRemoveBlogModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();

  const userReducer = useSelector((state) => state?.user);
  const loginData = JSON.parse(localStorage.getItem("pms_user"));
  useEffect(() => {
    let req = {
      search_text: searchName,
      isPagination: true,
      limit: 10,
      page: searchName ? 1 : page,
    };
    dispatch(getAllProjectAction(req));
  }, [searchName, page, dispatch]);
  useEffect(() => {
    ;
    reset();
  }, [show]);
  const handleSearch = () => {
    setPage(1)
    setsearchName("");
  };
  let navigate = useNavigate();
  function deleteBlog() {
  }
  useEffect(() => {
    if (rowData) {

      setValue("projectName", rowData?.projectName || "");
      setValue("projectCost", rowData?.projectCost || "");
      setValue("projectTimeline", rowData?.projectTimeline || "");
      setValue("startDate", rowData?.startDate || "");
      setValue("endDate", rowData?.endDate || "");
    }
  }, [rowData]);
  const onSuccess = () => {

    let req = {
      search_text: '',
      isPagination: true,
      limit: 10,
      page: 1,
    };
    dispatch(getAllProjectAction(req));
    setShow(false);
    setEditShow(false);
  };
  function onEdit(row, item) {
    row.stopPropagation();
    setEditShow(true);
    setEditRow(item);
    setrowData(item);
    setTeamId(item?.projectId);
  }
  function onSubmit(data) {
    let req = {
      projectName: data.projectName,
      projectCost: data.projectCost,
      projectTimeline: data.projectTimeline,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    dispatch(createProjectAction(req, onSuccess, Notification));
  }
  useEffect(() => {
    if (editRow) {
      setValue("projectName", editRow.projectName || "");
    }
  }, [editRow]);
  function handleDeleteTeam(removeId) {

    let req = {
      projectId: removeId.projectId,
    };
    dispatch(deleteProjectAction(req, onSuccess, Notification));
  }
  function onRemove(row, item) {
    row.stopPropagation();
    setRemoveUserModal(true);
    setRemoveId(item);
  }
  const handleClose = () => {
    setShow(false);
  };
  function onEditSubmit(data) {
    let req = {
      projectId: teamId,
      projectName: data.projectName,
      projectCost: data.projectCost,
      projectTimeline: data.projectTimeline,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    dispatch(editProjectAction(req, onSuccess, Notification));
  }
  const handleEditClose = () => {
    setEditShow(false);
  };
  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  const hanldeChange = (row, obj) => {
    setData(obj);
    if (keyValue.length < 2) {
      setmodalEncrypt(true);
    } else {
      navigate("/project-progress", {
        state: {
          data,
          keyValue,
        },
      });
    }
    ;
  };
  const handlePageChange = (page, sizePerPage) => {
    setPage(page);
    setSizePerPage(sizePerPage);
  };
  const columns = [
    {
      text: "Project Name",
      dataField: "projectName",
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>{row ? row : "N/A"}</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Project Cost",
      dataField: "projectCost",
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>{row ? "$" + row : "N/A"}</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Project Timeline",
      dataField: "projectTimeline",
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>{row ? row : "N/A"} Weeks</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Project Start Date",
      dataField: "startDate",
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>{row ? row : "N/A"}</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Project End Date",
      dataField: "endDate",
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>{row ? row : "N/A"}</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
    },

    // {
    //   text: "Status",
    //   dataField: "projectStatus",
    //   align: "center",
    //   headerAlign: "center",
    //   sort: true,
    //   formatter: (row, cell) => {
    //     return (
    //       <>
    //         {cell.projectStatus === "Active" ? (
    //           <div className="status-style">
    //             <span>{"Active"}</span>
    //           </div>
    //         ) : (
    //           <div className="status-style-inactive">
    //             <span>{"Inactive"}</span>
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
            <AiFillEdit
              color="#386697"
              className="edit-icon me-2"
              onClick={(row) => onEdit(row, item)}
            />
            {/* <AiOutlineEye
              className="download-icon me-2"
              size={20}
              onClick={(row) => hanldeChange(row, item)}
            /> */}
            <RiDeleteBin6Line
              className="delete-icon"
              onClick={(row) => onRemove(row, item)}
            />
          </>
        );
      },
      left: true,
    },
  ];
  const selectRow = {
    hideSelectColumn: true,
    clickToSelect: true,
    // onSelect: hanldeChange,
  };
  return (
    <div>
      <Row>
        <Col lg={12}>
          <div className="d-flex  justify-content-end pb-3 ">
            {/* <h3 className="  mb-2">
              Projects List
            </h3> */}
            <div className="d-flex">
              <Button
                data-tut="reactour__action"
                className="btn-primary border-0"
                onClick={() => setShow(true)}
              >
                Add Project
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
                <h5 className="mb-2">Projects List</h5>
                <div className="d-flex ">
                  <Form.Group className="me-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      value={searchName}
                      onChange={(e) => setsearchName(e.target.value)}
                      placeholder="Search Project"
                    />
                  </Form.Group>
                  <div
                    className="filter-btn d-flex align-items-center view-all-button cursor-pointer text-white"
                    onClick={() => handleSearch()}
                  >
                    <MdFilterAlt />
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className=" blog-table table-responsive">
            {userReducer?.getAllProjectLoading === true && (
              <div className="text-center user-listing-loader">
                {" "}
                <ScaleLoader color="#0f71b0" />
              </div>
            )}
            {userReducer?.getAllProjectFailure === true && (
              <span className="text-danger text-center">Network Error</span>
            )}
            {userReducer && userReducer.getAllProjectSuccess === true && (
              <BootstrapTable
                className=""
                // bootstrap4
                noDataIndication={"No Record Found"}
                keyField="_id"
                data={
                  userReducer?.getAllProjectData?.data
                    ? userReducer?.getAllProjectData?.data
                    : []
                }
                columns={columns}
                selectRow={selectRow}
                hover
              // pagination={paginationFactory(options)}
              />
            )}
            <CustomPagination
              page={page}
              sizePerPage={sizePerPage}
              totalSize={userReducer?.getAllProjectData?.meta?.totalRecords || 0}
              onPageChange={handlePageChange}
            />
          </Row>
          <div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              size="md"
              className="user-modal"
            >
              <Modal.Header className="border-0 ">
                <Modal.Title> {"Add Project"}</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="label-primary">
                            Project Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            size="sm"
                            placeholder="Enter Project Name"
                            {...register("projectName", { required: true })}
                          />
                          {errors.projectName && (
                            <FieldError message={"This Field is Required"} />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="label-primary">
                            Project Timeline
                          </Form.Label>
                          <Form.Control
                            type="number"
                            size="sm"
                            placeholder="Enter Project Timeline (in weeks"
                            {...register("projectTimeline", { required: true })}
                          />
                          {errors.projectTimeline && (
                            <FieldError message={"This Field is Required"} />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="label-primary">
                            Project Cost
                          </Form.Label>
                          <Form.Control
                            type="number"
                            size="sm"
                            placeholder="Enter Project Cost"
                            {...register("projectCost", { required: true })}
                          />
                          {errors.projectCost && (
                            <FieldError message={"This Field is Required"} />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="label-primary">
                            Start Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            size="sm"
                            placeholder="Enter Project Start Date"
                            {...register("startDate", {
                              required: true,
                            })}
                          />
                          {errors.startDate && (
                            <FieldError message={"This Field is Required"} />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="label-primary">
                            End Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            size="sm"
                            placeholder="Enter Project End Date"
                            {...register("endDate", { required: true })}
                          />
                          {errors.endDate && (
                            <FieldError message={"This Field is Required"} />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Modal.Body>
                <Modal.Footer className="border-0 ">
                  <h6
                    className="me-3 cursor btn-closeAndBack"
                    onClick={handleClose}
                  >
                    Cancel
                  </h6>
                  <Button className="btn-primary border-0 px-3" type="submit">
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
          {modalEncrypt && (
            <div>
              <Modal
                show={modalEncrypt}
                // onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="md"
                className="user-modal"
              >
                <Modal.Header className="border-0 ">
                  <Modal.Title> {"Add Encryption Key"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Form.Label className="label-primary">
                          Add Encryption Key
                        </Form.Label>
                        <input
                          type="text"
                          size="sm"
                          className="form-control"
                          placeholder="Enter Encryption Key "
                          value={keyValue}
                          onChange={(e) => setkeyValue(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Modal.Body>
                <div className="border-0  p-3 d-flex justify-content-end align-items-center">
                  <h6
                    className="me-3 mb-0 cursor btn-closeAndBack"
                    onClick={() => setmodalEncrypt(false)}
                  >
                    Cancel
                  </h6>
                  <Button
                    className="btn-primary border-0 px-3"
                    onClick={() => hanldeChange(" ", " ")}
                  >
                    Save
                  </Button>
                </div>
              </Modal>
            </div>
          )}
        </Card.Body>
      </Card>
      <div>
        <Modal
          show={showEdit}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
          size="md"
          row={editRow}
          className="user-modal"
        >
          <Modal.Header className="border-0 ">
            <Modal.Title> {"Edit Project"}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(onEditSubmit)}>
            <Modal.Body>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">
                        Project Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        name="projectName"
                        placeholder="Enter Task Name"
                        {...register("projectName", { required: true })}
                      />
                      {errors.projectName && (
                        <FieldError message={"This Field is Required"} />
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">
                        Project Timeline
                      </Form.Label>
                      <Form.Control
                        type="number"
                        size="sm"
                        name="projectTimeline"
                        placeholder="Enter Project Timeline (in weeks"
                        {...register("projectTimeline", { required: true })}
                      />
                      {errors.projectTimeline && (
                        <FieldError message={"This Field is Required"} />
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">
                        Project Cost
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="projectCost"
                        size="sm"
                        placeholder="Enter Project Cost"
                        {...register("projectCost", { required: true })}
                      />
                      {errors.projectCost && (
                        <FieldError message={"This Field is Required"} />
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">
                        Start Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        size="sm"
                        name="startDate"
                        placeholder="Enter Project Start Date"
                        {...register("startDate", { required: true })}
                      />
                      {errors.startDate && (
                        <FieldError message={"This Field is Required"} />
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">
                        End Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        size="sm"
                        name="endDate"
                        placeholder="Enter Project End Date"
                        {...register("endDate", { required: true })}
                      />
                      {errors.endDate && (
                        <FieldError message={"This Field is Required"} />
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Modal.Body>
            <Modal.Footer className="border-0 ">
              <h6
                className="me-3 cursor btn-closeAndBack"
                onClick={handleEditClose}
              >
                Cancel
              </h6>
              <Button className="btn-primary border-0 px-3" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <RemoveModal
        show={removeUserModal}
        handleClose={() => setRemoveUserModal(false)}
        title="Project"
        remove={() => handleDeleteTeam(removeId)}
      />
    </div>
  );
}
