import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { MdFilterAlt, MdOutlineEdit, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../../assets/images";
import RemoveModal from "../../../components/genericModal/RemoveModal";
import {
  createNewSalleryResourceAction,
  createProjectAction,
  deleteNewSalleryResourceAction,
  deleteProjectAction,
  editNewSalleryResourceAction,
  editProjectAction,
  createTaskAction,
  getAllProjectAction,
  getAllSalleryResourcesAction,
  getAllUserWithoutLoginIdAction,
  getUserTasksAction,
  matchEncryptionKeyValueAction,

} from "../../../redux/actions/userAction";
import { useForm } from "react-hook-form";
import { Notification } from "../../../components/genericActions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FieldError } from "../../../components/errorMessage/ErrorMessage";
import { ScaleLoader } from "react-spinners";
import { AiFillEdit } from "react-icons/ai";

export default function SalleryManagement() {
  const [countBackground, setcountBackground] = useState(1);
  const [show, setShow] = useState(false);
  const [encryptValue, setEncryptValue] = useState(false);
  const [usersBackground, setusersBackground] = useState(1);
  const [valuToShow, setvaluToShow] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState();
  const [showEdit, setEditShow] = useState(false);
  const [editRow, setEditRow] = useState();
  const [searchName, setsearchName] = useState("");
  const [teamId, setTeamId] = useState();
  const [removeId, setRemoveId] = useState();
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [removeBlogModal, setRemoveBlogModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  useEffect(() => {
    ;
    let req = {
      search_text: searchName,
      limit: 10,
      page: 1,
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, []);
  const userReducer = useSelector((state) => state?.user);
  let userRole = userReducer?.getUserNoLoginIdData?.data?.filter(user => user.userRole === "Resource" || user.userRole === "TeamLead")
  const loginData = JSON.parse(localStorage.getItem("pms_user"));
  useEffect(() => {
    let req = {
      resourceName: searchName,
    };
    dispatch(getAllSalleryResourcesAction(req));
  }, [searchName]);
  const handleSearch = () => {
    let req = {
      search_text: searchName,
      limit: 10,
      page: 1,
    };
    dispatch(getAllProjectAction(req));
    setsearchName("");
  };
  const handleSelectChange = (selected) => {
    
    setSelectedOptions(selected);
  };

  let navigate = useNavigate();
  function deleteBlog() {
  }
  const onSuccess = () => {
    dispatch(getAllSalleryResourcesAction());
    setShow(false);
    setEditShow(false);
    reset()
  };
  function onEdit(row, item) {
    
    row.stopPropagation();
    setEditShow(true);
    setEditRow(item);
    setTeamId(item?.salaryId);
  }
  function onSubmit(data) {
    let req = {
      userId: selectedOptions?.value,
      salaryPKR: data.salaryPKR,
      salaryDollar: data.salaryDollar,
      // keyValue: data.keyValue,
    };

    dispatch(createNewSalleryResourceAction(req, onSuccess, Notification));
  }
  const onDecreptSuccess = () => {
    setvaluToShow(2);
    setEncryptValue(false);
    reset()
  };
  function onSubmitShowSalary(data) {
    let req = {
      keyValue: data.keyValue,
    };

    dispatch(
      matchEncryptionKeyValueAction(req, onDecreptSuccess, Notification)
    );
  }
  useEffect(() => {
    if (editRow) {
      

      setValue("salaryPKR", editRow.salaryPKR || "");
      setValue("salaryDollar", editRow.salaryDollar || "");
      setValue("resourceName", editRow?.user?.firstName + " " + editRow?.user?.lastName || "");
    }
  }, [editRow]);
  function handleDeleteTeam(removeId) {
    let req = {
      salaryId: removeId.salaryId,
    };
    dispatch(deleteNewSalleryResourceAction(req, onSuccess, Notification));
  }
  function onRemove(row, item) {
    row.stopPropagation();
    setRemoveUserModal(true);
    setRemoveId(item);
  }
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseEncryption = () => {
    setEncryptValue(false);
  };
  function onEditSubmit(data) {
    ;
    let req = {
      userId: editRow?.userId,
      salaryPKR: data.salaryPKR,
      salaryDollar: data.salaryDollar,
      salaryId: teamId
    };
    dispatch(editNewSalleryResourceAction(req, onSuccess, Notification));
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
  const columns = [
    {
      text: "Resource Name",
      dataField: "resourceName",
      formatter: (row, item) => {

        return (
          <>
            <div className="text-dark">
              <span>{item?.user?.firstName + " " + item?.user?.lastName || "N/A"}</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "PKR",
      dataField: "salaryPKR",
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>{row}</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Dollar",
      dataField: "salaryDollar",
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>${row}</span>
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
    //   dataField: "status",
    //   align: "center",
    //   headerAlign: "center",
    //   sort: true,
    //   formatter: (row) => {
    //     return (
    //       <>
    //         <div className="status-style">
    //           <span>{"Pending"}</span>
    //         </div>
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
            <AiFillEdit color="#386697"
              className="edit-icon me-2"
              onClick={(row) => onEdit(row, item)}
            />
            {/* <BsFillArrowDownSquareFill
                className="mx-3 download-icon"
                onClick={(row) => onArchive(row, item)}
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
  const loadMore = async () => {
  }
  const loadMoreOption = {
    label: 'Load More',
    value: 'loadMore',
    onClick: loadMore,
    // isDisabled: isLoading, // Disable button while loading
  };

  const UpdatedOptions = userRole?.length > 0
    ? [
      ...userRole.map((item) => ({
        value: item.userId,
        label: item.firstName + ' ' + item.lastName,
      })),
      loadMoreOption,
    ]
    : [];
  const CustomOption = (props) => {
    const { data } = props;
    return data.value === 'loadMore' ? (
      <button onClick={data.onClick}>Load More</button>
    ) : (
      <components.Option {...props} />
    );
  };

  // CustomMenu component
  const CustomMenu = (props) => {
    const { children } = props;
    return <components.Menu {...props}>{children}</components.Menu>;
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
              {valuToShow === 2 && (
                <Button
                  data-tut="reactour__action"
                  className="btn-primary border-0 mx-3"
                  onClick={() => setvaluToShow(1)}
                >
                  Hide Salary
                </Button>
              )}
              {/* {valuToShow === 1 && (
                <Button
                  data-tut="reactour__action"
                  className="btn-primary border-0 mx-3"
                  onClick={() => setEncryptValue(true)}
                >
                  Show Salary
                </Button>
              )} */}
              <Button
                data-tut="reactour__action"
                className="btn-primary border-0"
                onClick={() => setShow(true)}
              >
                Add Resource Salary
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
                <h5 className="mb-2">Resources List</h5>
                <div className="d-flex ">
                  <Form.Group className="me-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      value={searchName}
                      onChange={(e) => setsearchName(e.target.value)}
                      placeholder="Search Resource"
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
            {userReducer?.getAllSalleryResourcesLoading === true && (
              <div className="text-center user-listing-loader">
                {" "}
                <ScaleLoader color="#0f71b0" />
              </div>
            )}
            {userReducer?.getAllSalleryResourcesFailure === true && (
              <span className="text-danger text-center">Network Error</span>
            )}
            {userReducer &&
              userReducer.getAllSalleryResourcesSuccess === true && (
                <BootstrapTable
                  className=""
                  // bootstrap4
                  noDataIndication={"No Record Found"}
                  keyField="_id"
                  data={
                    userReducer?.getAllSalleryResourcesData?.data
                      ? userReducer?.getAllSalleryResourcesData?.data
                      : []
                  }
                  columns={columns}
                  selectRow={selectRow}
                  hover
                  pagination={paginationFactory(options)}
                />
              )}
          </Row>
          {show && (
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
                  <Modal.Title> {"Add Sallery"}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Modal.Body>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Form.Group className="mb-0">
                            <Form.Label className="label-primary">
                              Select Resource
                            </Form.Label>
                          </Form.Group>
                          <Select
                            required
                            options={UpdatedOptions}
                            // isMulti
                            value={selectedOptions}
                            onChange={handleSelectChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label className="label-primary">
                              Sallery in PKR
                            </Form.Label>
                            <Form.Control
                              type="text"
                              size="sm"
                              placeholder="Enter sallery in PKR"
                              {...register("salaryPKR", { required: true })}
                            />
                            {errors.salaryPKR && (
                              <FieldError message={"This Field is Required"} />
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label className="label-primary">
                              Sallery in Dollar
                            </Form.Label>
                            <Form.Control
                              type="text"
                              size="sm"
                              placeholder="Enter sallery in dollar"
                              {...register("salaryDollar", { required: true })}
                            />
                            {errors.salaryDollar && (
                              <FieldError message={"This Field is Required"} />
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label className="label-primary">
                              Key
                            </Form.Label>
                            <Form.Control
                              type="text"
                              size="sm"
                              placeholder="Enter Key"
                              {...register("keyValue", { required: true })}
                            />
                            {errors.keyValue && (
                              <FieldError message={"This Field is Required"} />
                            )}
                          </Form.Group>
                        </Col>
                      </Row> */}
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
          )}
          {encryptValue && (
            <div>
              <Modal
                show={encryptValue}
                onHide={handleCloseEncryption}
                backdrop="static"
                keyboard={false}
                size="md"
                className="user-modal"
              >
                <Modal.Header className="border-0 ">
                  <Modal.Title> {"Show Salary"}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmitShowSalary)}>
                  <Modal.Body>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label className="label-primary">
                              Key
                            </Form.Label>
                            <Form.Control
                              type="password"
                              size="sm"
                              placeholder="Enter Key"
                              {...register("keyValue", { required: true })}
                            />
                            {errors.keyValue && (
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
                      onClick={handleCloseEncryption}
                    >
                      Cancel
                    </h6>
                    <Button className="btn-primary border-0 px-3" type="submit">
                      Show
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
          )}
        </Card.Body>
      </Card>
      {showEdit && (
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
              <Modal.Title> {"Edit Resource"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onEditSubmit)}>
              <Modal.Body>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-primary">
                          Resource Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          size="sm"
                          disabled
                          name="resourceName"
                          // defaultValue={editRow?.resourceName}
                          placeholder="Enter Resource Name"
                          {...register("resourceName", { required: false })}
                        />
                        {errors.resourceName && (
                          <FieldError message={"This Field is Required"} />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-primary">
                          Sallery in PKR
                        </Form.Label>
                        <Form.Control
                          type="text"
                          size="sm"
                          name="salaryPKR"
                          placeholder="Enter sallery in PKR"
                          {...register("salaryPKR", { required: true })}
                        />
                        {errors.salaryPKR && (
                          <FieldError message={"This Field is Required"} />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-primary">
                          Sallery in Dollar
                        </Form.Label>
                        <Form.Control
                          type="text"
                          size="sm"
                          name="salaryDollar"
                          placeholder="Enter sallery in dollar"
                          {...register("salaryDollar", { required: true })}
                        />
                        {errors.salaryDollar && (
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
      )}
      <RemoveModal
        show={removeUserModal}
        handleClose={() => setRemoveUserModal(false)}
        title="Project"
        remove={() => handleDeleteTeam(removeId)}
      />
    </div>
  );
}
