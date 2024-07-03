import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Form,
    InputGroup,
    Modal,
    Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { createAssetRequestAction, editAssetRequestAction, getAllAssetRequestAction, getAssetRequestByResourceAction } from "../../redux/actions/userAction";

export default function EditRequestModal({ children, ...props }) {
    const {
        show,
        multiple,
        handleClose,
        roleId,
        title,
        updateModal,
        viewModal,
        role,
        onHide,
        addData,
        setShow,
        row, rowData, isListing, viewSatate
    } = props;
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const [requestStatus, setRequestStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentDate] = useState(new Date().toISOString().slice(0, 10));
    useEffect(() => {
        if (rowData) {
            setValue("priority", rowData.priority || "");
            setValue("assetName", rowData.assetName || "");
            setValue("description", rowData.description || "");
            setValue("rejectionReason", rowData.rejectionReason || "");
            setValue("requestStatus", rowData.requestStatus || "");
        }
    }, [rowData, setValue]);
    const userReducer = useSelector((state) => state?.user);
    const loggedInUser = JSON.parse(localStorage.getItem("pms_user"));
    let myResources = userReducer?.getUserNoLoginIdData?.data
    const onSuccess = () => {
        if (loggedInUser?.userRole == "Admin" || loggedInUser?.userRole == "HumanResource") {
            let req = {
                search_text: '',
                page: 1,
                limit: 10
            }
            dispatch(getAllAssetRequestAction(req))
            setShow(false)
        }
        else {
            let req = {
                userId: rowData?.userId
            }
            dispatch(getAssetRequestByResourceAction(req))
            setShow(false)
        }


    }
    let dispatch = useDispatch()
    function onSubmit(data) {
        let req = {
            "assetId": rowData?.assetId,
            "assetName": data.assetName,
            "priority": data.priority,
            "requestStatus": data.requestStatus,
            "description": data.description,
            "requestDate": rowData?.requestDate,
            "requestBy": rowData?.rowData?.requestBy,
            "approvedBy": loggedInUser?.firstName + " " + loggedInUser?.lastName,
            rejectionReason: data.rejectionReason || "",
            "userId": rowData?.userId
        }
        dispatch(editAssetRequestAction(req, onSuccess))
    }
    useEffect(() => {
        if (userReducer?.createAssetRequestByresourceSuccess) {
            setShow(false)
        }
    }, [userReducer])
    const handleSelectChange = (e) => {
        if (e.target.value == 'Rejected By Lead' || e.target.value == 'Rejected By Admin') {
            setRequestStatus(true)
        } else {
            setRequestStatus(false)
        }
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                size="md"
                className="user-modal"
            >
                <Modal.Header className="border-0 text-start d-block pb-0">
                    <Modal.Title>{viewSatate ? "View Request" : title}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Card.Body>
                            {" "}
                            <Row>
                                <Col lg="12">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="label-primary">
                                            Asset Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled={viewSatate}
                                            size="sm"
                                            name="assetName"
                                            placeholder="Enter Asset Name"
                                            {...register("assetName", { required: true })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="label-primary">Priority</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            size="sm"
                                            disabled={viewSatate}
                                            {...register("priority", { required: true })}
                                            name="priority"
                                        >
                                            <option></option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row>
                                <Col lg="12">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="label-primary">Request Status</Form.Label>
                                        {loggedInUser?.userRole == "Resource" ? <Form.Control
                                            type="text"
                                            placeholder="Request Status"
                                            disabled={viewSatate}
                                            name="requestStatus"
                                            {...register("requestStatus", { required: true })}
                                        /> : <Form.Select
                                            size="sm"
                                            {...register("requestStatus", { required: true })}
                                            disabled={loggedInUser?.userRole == "Resource" || viewSatate}
                                            name="requestStatus"
                                            onChange={handleSelectChange}
                                            placeholder="Select request Status"
                                        >
                                            {(loggedInUser?.userRole == "TeamLead" || loggedInUser?.userRole == "Resource") && <option value="Pending">Pending</option>}
                                            {(loggedInUser?.userRole == "TeamLead" && isListing == true) && <option value="Inprogress">Inprogress</option>}
                                            {(loggedInUser?.userRole == "TeamLead" && isListing == true) && <option value="Accepted By Lead">Accept</option>}
                                            {(loggedInUser?.userRole == "TeamLead" && isListing == true) && <option value="Rejected By Lead">Reject</option>}
                                            {(loggedInUser?.userRole == "Admin") && <option value="Accepted By Lead">Inprogress</option>}
                                            {loggedInUser?.userRole == "Admin" && <option value="Accepted By Admin">Accept</option>}
                                            {loggedInUser?.userRole == "Admin" && <option value="Rejected By Admin">Reject</option>}
                                            {loggedInUser?.userRole == "HumanResource" && <option value="Dispatch">Dispatch</option>}
                                        </Form.Select>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="label-primary">
                                            Description
                                        </Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                as="textarea"
                                                disabled={viewSatate}
                                                placeholder="Enter Description"
                                                name="description"
                                                {...register("description", { required: true })}
                                                aria-label="With textarea"
                                                style={{ height: "100px" }}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {(requestStatus || rowData?.rejectionReason?.length > 0) &&
                                <Row>
                                    <Col lg="12">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-primary">
                                                Reason of Rejection
                                            </Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    as="textarea"
                                                    disabled={viewSatate}
                                                    placeholder="Enter Reason"
                                                    name="rejectionReason"
                                                    {...register("rejectionReason", { required: requestStatus })}
                                                    aria-label="With textarea"
                                                    style={{ height: "100px" }}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>}
                        </Card.Body>
                    </Modal.Body>
                    <Modal.Footer className="border-0 d-flex w-100">
                        {addData === true ? (
                            <Row className="w-100">
                                <Col
                                    lg="12"
                                    className="d-flex w-100 justify-content-end align-items-center"
                                >
                                    <h6
                                        className="cursor btn-closeAndBack mb-0"
                                        onClick={onHide}
                                    >
                                        Cancel
                                    </h6>
                                    {!viewSatate && <Button className="btn-primary border-0 px-3 ms-3" type="submit" disabled={userReducer?.createAssetRequestByresourceLoading}>
                                        {userReducer?.createAssetRequestByresourceLoading ? <PulseLoader color="#39b6fe" size={5} /> : "Save"}
                                    </Button>}

                                </Col>
                            </Row>
                        ) : (
                            <Row className="w-100">
                                <Col
                                    lg="12"
                                    className="d-flex w-100 justify-content-end align-items-center"
                                >
                                    <h6
                                        className="me-3 cursor btn-closeAndBack mb-0"
                                        onClick={onHide}
                                    >
                                        Cancel
                                    </h6>
                                    <Button className="btn-primary border-0 px-3" type="submit">
                                        update
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
