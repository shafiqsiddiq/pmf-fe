import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row, Tooltip } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { MdFilterAlt, MdOutlineEdit, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select, { components } from "react-select";
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { ScaleLoader } from "react-spinners";
import { FieldError } from "../../components/errorMessage/ErrorMessage";
import RemoveModal from "../../components/genericModal/RemoveModal";
import EditRequestModal from "../../components/genericModal/EditRequestModal";
import { getAllAssetRequestAction, getAllUserWithoutLoginIdAction, getAssetRequestByResourceAction } from "../../redux/actions/userAction";
import CustomPagination from "../../components/genericModal/CustomPagination";

export default function AllQueryRequestsRequests() {
    const [updateModal, setUpdateModal] = useState(false);
    const [page, setPage] = useState(1);
    const [searchName, setsearchName] = useState("");

    const [sizePerPage, setSizePerPage] = useState(10);
    const [rowData, setRowData] = useState(false);
    let dispatch = useDispatch();
    useEffect(() => {
        let req = {
            search_text: '',
            page: searchName ? 1 : page,
            limit: 10
        }
        dispatch(getAllAssetRequestAction(req))
    }, [searchName,, dispatch])


    const handlePageChange = (page, sizePerPage) => {
        
        setPage(page);
        setSizePerPage(sizePerPage);
    };
    let queryReducer = useSelector((state) => state?.user);
    const columns = [
        {
            text: 'Requested By',
            dataField: "requestBy",

        },
        {
            text: 'Asset Name',
            dataField: "assetName",

        },
        {
            text: `Priority`,
            dataField: `priority`,
            sort: true,
        },


        {
            text: "Date",
            dataField: "requestDate",
            formatter: (row, item) => {
                return (
                    <>
                        <div className="cursor-pointer">
                            {moment(row)?.format(" MMMM DD, YYYY")}
                        </div>
                    </>
                );
            },
            sort: true,
            // selector: (row) => row,
        },
        {
            text: "Status",
            dataField: "requestStatus",
            formatter: (row, item) => {
                return (
                    <div>
                        {row.requestStatus}
                        {CategoryFunction(row, item)}
                    </div>
                );
            },
            sort: true,
        },
        {
            text: `Description`,
            dataField: `description`,
            // formatter: (row, item) => {
            //   return (
            //     <>
            //       <div className="row-container">
            //         <Tooltip
            //           key={row}
            //           content={row}
            //           className="tooltip-trigger"
            //           arrowSize={10}
            //           arrowColor="#333333"
            //         >
            //           <div className="tooltip-trigger">
            //             {row?.length > 15 ? row?.slice(0, 20) + "..." : row}
            //           </div>
            //         </Tooltip>
            //       </div>
            //     </>
            //   );
            // },
            // selector: (row) => row,
            sort: true,
        },
        {
            text: "Action",
            dataField: "action",
            sort: true,
            formatter: (rowIndex, row) => {

                return (
                    <div


                    >
                        <>
                            <MdOutlineEdit
                                className="font-style-tiles eye-icon-edit "
                                onClick={() => { setUpdateModal(true); setRowData(row) }}
                            />

                        </>
                    </div>
                );
            },
        },
    ];
    const selectRow = {
        hideSelectColumn: true,
        clickToSelect: true,
        // onSelect: hanldeChange,
    };
    const loggedInUser = JSON.parse(localStorage.getItem("pms_user"));
    return (
        <div>
            <Card className="border-0">
                <Card.Body>
                    <Row className="mb-3">
                        <Col lg={12}>
                            <div className="d-flex flex-wrap justify-content-between align-items-center ">
                                <h5 className="mb-2">All Resources Queries</h5>
                                <div className="d-flex ">
                                    {/* <div className="me-2">
                                        <Select
                                            required
                                            placeholder="Select Resource"
                                            options={MY_RESORCES}
                                            // isMulti
                                            value={selectedResource}
                                            onChange={handleSelectChange}

                                        />
                                    </div> */}
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

                    <Row className=" blog-table table-responsive ">
                        {/* {userReducer?.getAllSalleryResourcesLoading === true && (
              <div className="text-center user-listing-loader">
                {" "}
                <ScaleLoader color="#0f71b0" />
              </div>
            )}
            {userReducer?.getAllSalleryResourcesFailure === true && (
              <span className="text-danger text-center">Network Error</span>
            )} */}
                        {queryReducer?.getAllAssetRequestSuccess && (
                            <BootstrapTable
                                className=""
                                // bootstrap4
                                noDataIndication={"No Record Found"}
                                keyField="_id"
                                data={loggedInUser?.userRole == "Admin" ? queryReducer?.getAllAssetRequest?.data?.filter((requestStatus) => requestStatus.requestStatus == "Accepted By Lead") : queryReducer?.getAllAssetRequest?.data?.filter((requestStatus) => requestStatus.requestStatus == "Accepted By Admin")
                                    || []
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
                            totalSize={loggedInUser?.userRole == "Admin" ? queryReducer?.getAllAssetRequest?.data?.filter((requestStatus) => requestStatus.requestStatus == "Accepted By Lead")?.length : queryReducer?.getAllAssetRequest?.data?.filter((requestStatus) => requestStatus.requestStatus == "Accepted By Admin")?.length || 0} // Replace with your actual total size
                            onPageChange={handlePageChange}
                        />
                    </Row>
                    <EditRequestModal
                        show={updateModal}
                        rowData={rowData}
                        setShow={setUpdateModal}
                        onHide={() => setUpdateModal(false)}
                        addData={true}

                        title="Edit Request"
                    />
                </Card.Body>
            </Card>
        </div>
    );
}
const CategoryFunction = (row, listingData) => {
    return (
        <div className="">
            {row === "Inprogress" ? (
                <span className="bg-warning badge text-white px-2 py-2 rounded status-heading">
                    {row}
                </span>
            ) : row === "Pending" ? (
                <span className="bg-light-grey badge px-3 py-2 rounded status-heading">
                    {row}
                </span>
            ) : row === "Dispatch" ? (
                <span className="bg-success text-white badge px-4 py-2 rounded status-heading">
                    {row}
                </span>
            ) : row === "Accepted By Admin" || row === "Accepted By Lead" ? (
                <span className="bg-primary text-white badge  px-4 py-2 rounded status-heading">
                    {location?.pathname === "/human-resource" ? "Pending" : row}
                </span>
            ) : (
                <span className="bg-danger text-white badge  px-4 py-2 rounded status-heading">
                    {row}
                </span>
            )}
        </div>
    );
};