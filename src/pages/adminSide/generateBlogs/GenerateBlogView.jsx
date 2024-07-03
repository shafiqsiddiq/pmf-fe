import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TbSend } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import RemoveModal from "../../../components/genericModal/RemoveModal";
import { useDispatch, useSelector } from "react-redux";
import { generateBlogAction } from "../../../redux/actions/generateBlogAction";

import { PulseLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { GENERATEBLOG } from "../../../redux/actions/utilities";
import { BlogChangestatusAction } from "../../../redux/actions/userAction";
export default function GenerateBlogView() {
  const generateBlog = useSelector((state) => state.generateBlog);

  const [promptHeading, setPromptHeading] = useState();
  const [removeBlogModal, setRemoveBlogModal] = useState(false);
  const [description, setDescription] = useState(generateBlog?.generatedBlog);
  const { register, handleSubmit, reset, setFocus } = useForm();
  let params = new URL(document.location).searchParams;

  let dispatch = useDispatch();
  const handleClick = () => {
    setFocus("promptValue");
  };
  useEffect(() => {
    if (generateBlog?.generatedBlog) {
      setDescription(generateBlog?.generatedBlog);
    }
  }, [generateBlog?.generatedBlog, dispatch]);
  useEffect(() => {
    return () => {
      
      dispatch({ type: GENERATEBLOG.GENERATE_BLOG_SUCCESS, payload: [] });
    };
  }, [dispatch]);
  const onSuccess = () => {
  };
  const onSubmit = (data) => {
    if (data.promptValue?.length > 0) {
      setPromptHeading(data.promptValue);
      let finalData = {
        text: data.promptValue,
      };
      dispatch(generateBlogAction(finalData, onSuccess));

      reset();
      setFocus("promptValue");
    }
  };

  function deleteBlog() {
  }
  function onSuccessMethod(){
  }
  const pushToClientAction = (data) => {
    let finalData = {
      blogTitle: promptHeading,
      request_id: params.get("request_id"),
      status: 3,
      blogDescription: description,
    };
   
    dispatch(BlogChangestatusAction(finalData, onSuccessMethod));
    // props?.setBlogsBackground(1);
    // props?.setcountBackground(1);
  };
  return (
    <div className="">
      <Row className="">
        <Col className="col-md-3">
          <Card className="h-100">
            <Card.Body>
              <div className="chat-list">
                <button className="new-chat" onClick={handleClick}>
                  <BiPlus className="" />
                  <span> New Blog</span>
                </button>
                <ul>
                  <li className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link className="">
                        {" "}
                        {/* <FiMessageSquare className="" /> */}
                        <span> Vitamins for Health</span>
                      </Link>{" "}
                    </div>

                    <div className="d-flex">
                      <span>
                        {" "}
                        <Badge bg="success" style={{ fontSize: "9px" }}>
                          accepted
                        </Badge>{" "}
                      </span>
                      <span>
                        <MdDeleteOutline
                          className="fs-6 ms-2 cursor"
                          fill="red"
                          onClick={() => setRemoveBlogModal(true)}
                        />
                      </span>
                    </div>
                  </li>
                  <li className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link className="">
                        {" "}
                        {/* <FiMessageSquare className="" /> */}
                        <span> Vitamins for Health</span>
                      </Link>{" "}
                    </div>

                    <div className="d-flex">
                      <span>
                        {" "}
                        <Badge bg="success" style={{ fontSize: "9px" }}>
                          accepted
                        </Badge>{" "}
                      </span>
                      <span>
                        <MdDeleteOutline
                          className="fs-6 ms-2 cursor"
                          fill="red"
                          onClick={() => setRemoveBlogModal(true)}
                        />
                      </span>
                    </div>
                  </li>
                  <li className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link className="">
                        {" "}
                        {/* <FiMessageSquare className="" /> */}
                        <span> Vitamins for Health</span>
                      </Link>{" "}
                    </div>

                    <div className="d-flex">
                      <span>
                        {" "}
                        <Badge bg="success" style={{ fontSize: "9px" }}>
                          accepted
                        </Badge>{" "}
                      </span>
                      <span>
                        <MdDeleteOutline
                          className="fs-6 ms-2 cursor"
                          fill="red"
                          onClick={() => setRemoveBlogModal(true)}
                        />
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-md-9 ps-0">
          <Row className="">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white p-3 search-feild">
                <div className="d-flex  ">
                  <div style={{ width: "100%" }} className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Enter Prompt"
                      // ref={ref}
                      {...register("promptValue")}
                    />
                    <div className="search-btn cursor">
                      {generateBlog?.generateBlogLoading === true ? (
                        <PulseLoader color="#39b6fe" size={5} />
                      ) : (
                        <Button type="submit" className="bg-transparent">
                          <TbSend
                            className="cursor fs-6"
                            style={{ color: "#39b6fe" }}
                            // fill="#39b6fe"
                            disabled={
                              generateBlog?.generateBlogLoading === true
                            }
                          />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Row>
          <Card className="mt-2">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className=" d-flex ">
                  {/* <img
                    // src={IMAGES.USER_HEADER_IMG}
                    alt="user"
                    className="rounded-circle"
                  /> */}
                  <p className="align-self-center mb-0 ms-2">{promptHeading}</p>
                </div>
                <div>
                  <span className="me-2">
                    <button className="btn-header">Save as draft</button>
                  </span>
                  <span className="">
                    <button className="btn-header" onClick={()=>pushToClientAction()}>Push to client</button>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Row>
            <div className="blog-description">
              <CKEditor
                editor={ClassicEditor}
                data={
                  generateBlog?.generateBlogLoading === true
                    ? "Waiting For Response...."
                    : description
                }
                disabled={generateBlog?.generateBlogLoading === true}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // setDescription(data);
                }}
              >
                {generateBlog?.generateBlogLoading === true && (
                  <div className="loader-overlay">"sdfgh"</div>
                )}
              </CKEditor>
            </div>
          </Row>
        </Col>
      </Row>
      <RemoveModal
        show={removeBlogModal}
        handleClose={() => setRemoveBlogModal(false)}
        title="Blog"
        remove={deleteBlog}
      />
    </div>
  );
}
