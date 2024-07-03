import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Tooltip from "react-tooltip-lite";
import Select from "react-select";
import { MdOutlineEdit, MdFilterAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createTeamAction, deleteTeamAction, editTeamAction, getAllProjectAction, getAllTeamsAction, getAllUserWithoutLoginIdAction } from "../../../redux/actions/userAction";
import { useForm } from "react-hook-form";
import { FieldError } from "../../../components/errorMessage/ErrorMessage";
import { Notification } from "../../../components/genericActions";
import { ScaleLoader } from "react-spinners";
import RemoveModal from "../../../components/genericModal/RemoveModal";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import CustomPagination from "../../../components/genericModal/CustomPagination";

export default function CreateTeam() {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [editRow, setEditRow] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [removeId, setRemoveId] = useState(null);
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [searchName, setsearchName] = useState("");

  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const user = JSON.parse(localStorage.getItem("pms_user"));

  const userReducer = useSelector((state) => state?.user);

  useEffect(() => {
    let req = { search_text: searchName, limit: 10, page: searchName ? 1 : page };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, [searchName, page, dispatch]);

  useEffect(() => {
    let req = { search_text: searchName, limit: 10, page: searchName ? 1 : page };
    dispatch(getAllProjectAction(req));
    dispatch(getAllTeamsAction(req));
  }, [searchName, page, dispatch]);

  useEffect(() => {
    if (editRow) {
      setValue("teamName", editRow?.teamName || "");
      setSelectedOptions(editRow?.members?.map(member => ({
        value: member.userId,
        label: member.firstName + " " + member.lastName
      })));
    }
  }, [editRow, setValue]);

  const handleClose = () => {
    setShow(false);
    setEditRow(null);
    reset();
  };

  const handleSearch = () => {
    let req = { search_text: '', limit: 10, page: 1 };
    dispatch(getAllTeamsAction(req));
    setsearchName("");
  };

  const onSuccess = () => {
    let req = { search_text: '', limit: 10, page: 1 };
    dispatch(getAllTeamsAction(req));
    handleClose();
  };

  const onEdit = (row, item) => {
    row.stopPropagation();
    setShow(true);
    setEditRow(item);
    setTeamId(item?.teamId);
  };
  const handlePageChange = (page, sizePerPage) => {
    setPage(page);
    setSizePerPage(sizePerPage);
  };
  const onSubmit = data => {
    
    let req = {
      project: data.projectName || editRow?.project?.projectId,
      teamName: data.teamName,
      id: editRow ? editRow.teamId : undefined,
      members: selectedOptions?.filter(item => item?.value)?.map(resource => resource.value)
    };

    dispatch(editRow ? editTeamAction(req, onSuccess, Notification) : createTeamAction(req, onSuccess, Notification));
  };

  const handleDeleteTeam = removeId => {
    dispatch(deleteTeamAction(removeId, onSuccess, Notification));
  };

  const handleSelectChange = selected => {
    setSelectedOptions(selected);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedOptions(userRole?.map(item => ({ value: item.userId, label: item.firstName + " " + item.lastName })));
    }
    else {
      setSelectedOptions([]);
    }
  };
  const handleChange = (e, projectCost) => {
    ;
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    let value = e.target.value;
  };
  const handleClearSelection = () => {
    setSelectedOptions([]);
  };
  const userRole = userReducer?.getUserNoLoginIdData?.data
    ?.filter(item => item?.userRole === "Resource" || item?.userRole === "TeamLead")
    .map(filtered => filtered);
  const columns = [
    { text: "Team Name", dataField: "teamName", sort: true },
    { text: "Project Name", dataField: "project", formatter: (row, item) => item?.project?.projectName, sort: true },
    {
      text: "Resources", dataField: "members", formatter: (row, item) => {
        const visibleData = item?.members?.slice(0, 3);
        const tooltipData = item?.members?.slice(3);
        return (
          <div className="row-container">
            {visibleData?.map(record => (
              <Tooltip key={record.id} content={record?.firstName + ' ' + record?.lastName} className="my-tooltip" arrowSize={10} arrowColor="#333333">
                <div className="tooltip-trigger">{record?.firstName + ' ' + record?.lastName + ", "}</div>
              </Tooltip>
            ))}
            {tooltipData?.length > 0 && (
              <Tooltip content={tooltipData?.map(record => record?.firstName + ' ' + record?.lastName).join(", ")} className="my-tooltip" arrowSize={10} arrowColor="#333333">
                <div className="tooltip-trigger">
                  <span className="tooltip-triggess">+{tooltipData?.length} more</span>
                </div>
              </Tooltip>
            )}
          </div>
        );
      }, sort: true
    },
    {
      text: "Action", dataField: "action", formatter: (row, item) => (
        <>
          <AiFillEdit color="#386697" className="edit-icon me-2" onClick={row => onEdit(row, item)} />
        </>
      ), left: true
    }
  ];

  const options = { sizePerPage: 10, hideSizePerPage: true, hidePageListOnlyOnePage: true };

  return (
    <div>
      <Row>
        <Col lg={12}>
          <div className="d-flex justify-content-end pb-3">
            <div className="d-flex">
              <Button className="btn-primary border-0" onClick={() => setShow(true)}>Add Team</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Card className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <h5 className="mb-2">Project Team List</h5>
                <div className="d-flex">
                  <Form.Group className="me-2">
                    <Form.Control type="text" size="sm" value={searchName} onChange={e => setsearchName(e.target.value)} placeholder="Search Project Team" />
                  </Form.Group>
                  <div className="filter-btn d-flex align-items-center view-all-button cursor-pointer text-white" onClick={handleSearch}>
                    <MdFilterAlt />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="blog-table table-responsive">
            {userReducer?.getAllTeamsLoading && (
              <div className="text-center user-listing-loader">
                <ScaleLoader color="#0f71b0" />
              </div>
            )}
            {userReducer?.getAllTeamsFailure && (
              <span className="text-danger text-center">Network Error</span>
            )}
            {userReducer?.getAllTeamsSuccess && (
              <BootstrapTable
                noDataIndication={"No Record Found"}
                keyField="projectId"
                data={userReducer?.getAllTeams?.data || []}
                columns={columns}
                selectRow={{ hideSelectColumn: true, clickToSelect: true }}
                hover
              // pagination={paginationFactory(options)}
              />
            )}
            <CustomPagination
              page={page}
              sizePerPage={sizePerPage}
              totalSize={userReducer?.getAllTeams?.meta?.totalRecords || 0} // Replace with your actual total size
              onPageChange={handlePageChange}
            />
          </Row>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editRow ? "Edit Team" : "Add Team"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {editRow ? <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" value={editRow?.project?.projectName} disabled />
            </Form.Group> : <Form.Group className="mb-3">
              <Form.Label className="label-primary">
                Project Name
              </Form.Label>
              <Form.Select
                {...register("projectName")}
                aria-label="Default select example"
                size="sm"
                onChange={(e) => handleChange(e, e.target.options[e.target.selectedIndex].getAttribute("data"))}
              // onChange={handleChange}
              >
                {userReducer?.getAllProjectData?.data?.map((item) => {
                  return (
                    <>
                      <option value={item?.projectId} data={item.projectCost} key={item?.projectId}>
                        {item?.projectName}
                      </option>
                    </>
                  );
                })}
              </Form.Select>
            </Form.Group>}
            <Form.Group className="mb-3">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Team Name"
                {...register("teamName", { required: "Please enter team name." })}
              />
              {errors.teamName && <FieldError message={errors.teamName.message} />}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Resource</Form.Label>
              <div className="d-flex mb-2">

                <input
                  type="checkbox"
                  className="me-2"
                  onChange={(e) => handleSelectAll(e)}
                  checked={selectedOptions.length === userRole?.length}
                />
                Select All
                {/* <Button className="btn-primary border-0 me-2" onClick={handleSelectAll}>Select All</Button> */}
                {selectedOptions?.length > 4 &&
                  <div className="ms-4">

                    <input
                      type="checkbox"
                      className="me-1"
                      onChange={handleClearSelection}
                    // checked={selectedOptions.length === 0}
                    /> Clear All</div>}
              </div>
              <Select
                isMulti
                name="colors"
                options={userRole?.map(item => ({ value: item.userId, label: item.firstName + " " + item.lastName }))}
                className="basic-multi-select"
                classNamePrefix="select"
                value={selectedOptions}
                onChange={handleSelectChange}
              />
            </Form.Group>
            <Row className="text-end my-1"><Col lg={2}><Button className="btn-primary border-0 mb-4" type="submit">{editRow ? "Update" : "Submit"}</Button></Col> </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <RemoveModal
        show={removeUserModal}
        handleClose={() => setRemoveUserModal(false)}
        onDelete={handleDeleteTeam}
        modalName={"Project Team"}
      />
    </div>
  );
}
