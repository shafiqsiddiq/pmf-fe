import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function GenerateBlog() {
  const [description, setDescription] = useState(
    "Nowadays, technologies are developing rapidly and already take a huge part of our everyday life. Modern world is one step behind of creating a machine that looks and acts mostly like a human. "
  );
  return (
    <div>
      <Row>
        <Col className="col-md-7">
          <Card className="h-100 p-2 border-0">
            <Card.Body>
              <Row className="mb-4 ">
                <Col className="col-7">
                  <Card.Title className="blog-header">Blog Tittle</Card.Title>
                  <h4 className="blog-title">Vitamins for Health</h4>
                </Col>
                <Col className="col-5 border">
                  <Row className="border-bottom">
                    <Col className="border-end">
                      <div className="p-3 blog-time-heading">
                        <h6>Date From</h6>
                        <span>03/05/2023</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="p-3 blog-time-heading">
                        <h6>Date To</h6>
                        <span>29/10/2023</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="border-end">
                      <div className="p-3 blog-time-heading">
                        <h6>No of words</h6>
                        <span>200 - 250</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="p-3 blog-time-heading">
                        <h6>Blog Type</h6>
                        <span>Medical</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <h4 className="blog-description-heading">Discription</h4>
              </Row>
              <Card.Text className="blog-description">
                Nowadays, technologies are developing rapidly and already take a
                huge part of our everyday life. Modern world is one step behind
                of creating a machine that looks and acts mostly like a human.
                The first questions that may arise are why we need an artificial
                humanoid, while we have more than enough real humans on this
                planet, moreover, how these machines would act and develop? It
                is believed that robots will think and feel only those things we
                tell them to know and feel. However, the main danger of
                artificial intelligence implementation into our everyday life is
                that people might have more interaction with those machines
                rather than between each other. Humans are facing such a problem
                even now, if we take into consideration the face how we are
                depended on the Internet and so called “virtual world”. Another
                point is if people will develop machines’ feelings and
                knowledge, cruel people can create cruel robots. Then, who will
                take responsibility on that? Therefore, most likely, robots will
                never take out the control on them from our hands, but we will
                give this control, consciously or unconsciously, to them. Yet,
                it is known how much efforts should be spend to retake any kind
                of control back.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-md-5 ps-0">
          <Card className="h-100 p-2 border-0">
            <Card.Body>
              <Row className="mb-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <Card.Title className="blog-header">
                      Blog Generator
                    </Card.Title>
                  </div>
                  <div>
                    <button className="image-upload">Upload Image</button>
                  </div>
                </div>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Blog Tittle
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Vitamins for Health  "
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Blog Type</Form.Label>
                    <Form.Select aria-label="Default select example" size="sm">
                      <option>Medical</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Date From</Form.Label>
                    <Form.Control
                      type="date"
                      size="sm"
                      placeholder="Vitamins for Health  "
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Date To</Form.Label>
                    <Form.Control
                      type="date"
                      size="sm"
                      placeholder="Vitamins for Health  "
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      No of words
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Vitamins for Health  "
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Category</Form.Label>
                    <Form.Select aria-label="Default select example" size="sm">
                      <option>Health</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <div className="mb-3">
                  <Form.Label className="label-primary">Description</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                    }}
                  />
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>
          <button className="btn-draft">Save in Draft</button>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            <div className="mx-4">
              <button className="btn-closeAndBack">Back</button>
            </div>
            <div>
              <button className="btn-primary">Update</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
