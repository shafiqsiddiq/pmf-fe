import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { MdFilterAlt, MdOutlineEdit, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import Select from "react-select";
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

export default function ProjectCostEstimation() {
  const [countBackground, setcountBackground] = useState(1);
  const [usersBackground, setusersBackground] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState();
  const [showEdit, setEditShow] = useState(false);
  const [editRow, setEditRow] = useState();
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
      firstName: "",
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, []);
  const [keyValue, setkeyValue] = useState("");
  const [encryptValue, setEncryptValue] = useState(false);
  const [modalEncrypt, setmodalEncrypt] = useState(false);
  useEffect(() => {
   setEncryptValue(true)
  }, []);
  const hanldeChange = (row, obj) => {
   
    
  };
  const userReducer = useSelector((state) => state?.user);
  let userRole = userReducer?.getUserNoLoginIdData;
  const loginData = JSON.parse(localStorage.getItem("pms_user"));
  useEffect(() => {
    let req = {
      resourceName: "",
    };
    dispatch(getAllSalleryResourcesAction(req));
  }, []);
  function onEdit(row, item) {
    row.stopPropagation();
    setEditShow(true);
    setEditRow(item);
    setTeamId(item?._id);
  }
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (editRow) {
      setValue("salleryPKR", editRow.salleryPKR || "");
      setValue("salleryDollar", editRow.salleryDollar || "");
      // setValue("projectName", editRow.projectName || "");
    }
  }, [editRow]);

  function onRemove(row, item) {
    row.stopPropagation();
    setRemoveUserModal(true);
    setRemoveId(item);
  }
  const handleClose = () => {
    setShow(false);
  };
  const [pkrSalery, setPkrSalery] = useState();
  const [projectEstimatedProfit, setprojectEstimatedProfit] = useState("");
  const [dollarSalery, setDollarSalery] = useState();
  const [projectName, setProjectName] = useState("");
  const [timeline, setTimeline] = useState(0);
  const [resourcetimeline, setresourcetimeline] = useState();
  const [resourcePercentage, setresourcePercentage] = useState();
  const [totalresourcesSallery, setTotalresourcesSallery] = useState();
  const [companyProfit, setCompanyProfit] = useState(0);
  const [resources, setResources] = useState([
    { resourceName: "", cost: 0, timeline: 0 },
  ]);
  const [allResourcesSalery, setallResourcesSalery] = useState([]);

  const calculateTotalResourceCost = () => {
    return resources.reduce(
      (totalCost, resource) => totalCost + resource.cost,
      0
    );
  };
  var sum = 0;
  function sumArray(array) {
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    // return sum;
  }
  const calculateProjectProfit = () => {
  
    let salleryConversionDollar = pkrSalery / 280;
    let resourceSalery = salleryConversionDollar + dollarSalery;
    let resourceWeeklySalery = resourceSalery / 4.4;
    let salleryProjectDuration = resourceWeeklySalery * resourcetimeline;
    let saleryContryButionProject =
      (salleryProjectDuration * resourcePercentage) / 100;
    let temp = 0;
    let totalSalery = resourceWeeklySalery;
    totalSalery = temp + resourceWeeklySalery;
    let temVar = [...allResourcesSalery];
    temVar.push(totalSalery);
    if (temVar) {
      setallResourcesSalery(temVar);
    }
    
  };
  sumArray(allResourcesSalery);

  const addResource = () => {
    setResources([...resources, { resourceName: "", cost: 0, timeline: 0 }]);
    // calculateProjectProfit()
  };
  const handleCloseEncryption = () => {
    setEncryptValue(false);
  };
  const removeResource = (index) => {
    
    const updatedResources = [...resources];
    updatedResources.splice(index);
    setResources(updatedResources);
    // const updatedSalaries = allResourcesSalery.filter((i) => i !== index);
    // setallResourcesSalery(updatedSalaries);
    
  };
  const updateResource = (index, updatedResource, selectedOption) => {
    let pkr = selectedOption?.testing?.salleryPKR;
    let dollar = selectedOption?.testing?.salleryDollar;
    ;

    if (typeof selectedOption === "number" && updatedResource === "timeline") {
      setresourcetimeline(selectedOption);
    } else if (
      typeof selectedOption === "number" &&
      updatedResource === "cost"
    ) {
      setresourcePercentage(selectedOption);
    } else if (typeof +pkr === "number" && typeof +dollar === "number") {
      setDollarSalery(dollar);
      setPkrSalery(pkr);
    }

    const updatedResources = [...resources];
    updatedResources[index] = { ...updatedResource, selectedOption };
    setResources(updatedResources);
  };

  let salleryConversionDollar = pkrSalery / 280;
  let resourceSalery = salleryConversionDollar + dollarSalery;
  let resourceWeeklySalery = resourceSalery / 4.4;
  let salleryProjectDuration = resourceWeeklySalery * resourcetimeline;
  let saleryContryButionProject =
    (salleryProjectDuration * resourcePercentage) / 100;

  let estimatedCost = sum + (sum * companyProfit) / 100;
  const handleClculateProfit = () => {
    let number = estimatedCost;
    var roundedNumber = parseFloat(number.toFixed(2));
    // if (roundedNumber) {
    //   setprojectEstimatedProfit(roundedNumber);
    // }
  
  };
  const onDecreptSuccess = () => {
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
  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">Project Cost Estimation</h5>
              </div>
            </Col>
          </Row>
          <Card.Body>
            <div>
              <h5 className="mt-4 mb-2">Project:</h5>
              <Row>
                <Col>
                  <label>Project Name:</label>
                  <input
                    type="text"
                    className="form-control d-inline"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Project Timeline (in Weeks):</label>
                  <input
                    type="number"
                    className="form-control d-inline"
                    value={timeline}
                    onChange={(e) => setTimeline(Number(e.target.value))}
                  />
                </Col>
                <Col>
                  <label>Company Profit %:</label>
                  <input
                    className="form-control d-inline"
                    type="number"
                    value={companyProfit}
                    onChange={(e) => setCompanyProfit(Number(e.target.value))}
                  />
                </Col>
              </Row>

              <h5 className="mt-4 mb-1">Resources:</h5>
              {resources.map((resource, index) => (
                <div key={index}>
                  <Row className={`${index===0?"":"mt-2"}`}>
                    <Col>
                      <label>Resource Name:</label>
                      <select
                        value={resource.resourceName}
                        className="form-control d-inline"
                        onChange={(e) => {
                          var testing = JSON.parse(e.target.value);
                          const updatedResource = {
                            ...resource,
                            resourceName: e.target.value,
                          };
                          const selectedOption = {
                            value: e.target.value,
                            text: e.target.options[e.target.selectedIndex].text,
                            testing: testing,
                          };
                          updateResource(
                            index,
                            updatedResource,
                            selectedOption
                          );
                        }}
                      >
                        <option value="">Select Resource</option>
                        {userReducer?.getResourceWithDecrepetedSalaryData?.data?.map(
                          (item) => (
                            <option
                              value={JSON.stringify(item)}
                              key={item.resource_id}
                            >
                              {item.resourceName}
                            </option>
                          )
                        )}
                      </select>
                    </Col>
                    <Col>
                      <label>Resource Participantion %:</label>
                      <input
                        type="number"
                        className="form-control d-inline"
                        // placeholder="Enter resource participation %"
                        value={resource.cost}
                        onChange={(e) =>
                          updateResource(index, "cost", Number(e.target.value))
                        }
                      />
                    </Col>
                    <Col>
                      <label className="d-block">
                        Resource Timeline (in Weeks):
                        <input
                          type="number"
                          className="form-control "
                          value={resource.timeline}
                          onChange={(e) =>
                            updateResource(
                              index,
                              "timeline",
                              Number(e.target.value)
                            )
                          }
                        />
                      </label>
                      {/* <ImCross
                        className="text-danger ms-3"
                        onClick={() => removeResource(index)}
                      /> */}
                    </Col>
                  </Row>
                </div>
              ))}

              <button
                className="btn-primary border-0 px-3 mt-2"
                onClick={addResource}
              >
                Add More
              </button>

              <h3 className="mt-3">
                Project Estimated Cost:
                <span className="text-muted"> ${parseFloat(estimatedCost.toFixed(2)) }</span>
              </h3>
            </div>
          </Card.Body>
          <div className="text-end">
            <Card.Body>
              <Button
                className="btn-primary border-0 px-3"
                onClick={() =>{handleClculateProfit();  calculateProjectProfit();}}
              >
                Calculate
              </Button>
            </Card.Body>
          </div>
        </Card.Body>
      </Card>
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
    </div>
  );
}
