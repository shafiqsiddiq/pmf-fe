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
import { createAssetRequestAction, getAssetRequestByResourceAction } from "../../redux/actions/userAction";

export default function AddQueryRequestModal({ children, ...props }) {
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
        row,
    } = props;
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const [currentDate] = useState(new Date().toISOString().slice(0, 10));
    useEffect(() => {
        if (row) {
            setValue("Priority", row.Priority || "");
        }
    }, [row, setValue]);
    const userReducer = useSelector((state) => state?.user);

    const loggedInUser = JSON.parse(localStorage.getItem("pms_user"));
    const onSuccess = () => {
        let req = {
            userId: loggedInUser?.userId
        }
        dispatch(getAssetRequestByResourceAction(req))
        setShow(false)
    }
    let dispatch = useDispatch()
    function onSubmit(data) {
        let req = {
            "assetName": data.assetName,
            "priority": data.priority,
            "requestStatus": data.requestStatus,
            "description": data.description,
            "requestDate": currentDate,
            "requestBy": loggedInUser?.firstName + " " + loggedInUser?.lastName,
            "approvedBy": "",
            rejectionReason: "",
            "userId": loggedInUser?.userId
        }
        dispatch(createAssetRequestAction(req, onSuccess))
    }
    // useEffect(() => {
    //     if (userReducer?.createAssetRequestByresourceSuccess) {
    //         setShow(false)
    //     }
    // }, [userReducer])
    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                // keyboard={false}
                size="md"
                className="user-modal"
            >
                <Modal.Header className="border-0 text-start d-block pb-0">
                    <Modal.Title>{title}</Modal.Title>
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
                                            // defaultValue={row?.}
                                            type="text"
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
                                            // value={row?.Priority || ""} // Use the value prop to set the selected value
                                            aria-label="Default select example"
                                            size="sm"
                                            {...register("priority", { required: true })}
                                            name="priority"
                                        >
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
                                        <Form.Select
                                            // value={row?.Priority || ""} // Use the value prop to set the selected value
                                            aria-label="Default select example"
                                            size="sm"
                                            {...register("requestStatus", { required: true })}
                                            name="requestStatus"
                                        >
                                            {loggedInUser?.userRole == "Resource" && <option value="Pending">Pending</option>}
                                            {loggedInUser?.userRole == "TeamLead" && <option value="Accepted By Lead">Pending</option>}
                                        </Form.Select>
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
                                                // defaultValue={row?.Description}
                                                as="textarea"
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
                                        className="me-3 cursor btn-closeAndBack mb-0"
                                        onClick={onHide}
                                    >
                                        Cancel
                                    </h6>
                                    <Button className="btn-primary border-0 px-3" type="submit" disabled={userReducer?.createAssetRequestByresourceLoading}>
                                        {userReducer?.createAssetRequestByresourceLoading ? <PulseLoader color="#39b6fe" size={5} /> : "Save"}
                                    </Button>

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
