import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { ParentComponentWithSideBar } from "../components/layout/ParentComponentWithSideBar";
import { useAuth } from "./ProvidedAuth";
import { PATH } from "../utils/path";
import { Button, Modal } from "react-bootstrap";

function ProtectedRoute({ element }) {
  const [showExpiry, setshowExpiry] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("pms_user"));
  const token = localStorage.getItem("pms_user_token");
  const pms_token_expiry = localStorage.getItem("pms_token_expiry");
  const auth = useAuth();
  useEffect(() => {
    ;
    const checkTokenExpiry = pms_token_expiry > moment().unix();
    if (checkTokenExpiry === false) {
      setshowExpiry(false);
    }
  }, [user]);
  useEffect(() => {
    ;
    if (!token) {
      navigate(PATH.LOGIN);
    }
  }, [navigate, user]);
  const Logout = () => {
    localStorage?.removeItem("pms_user");
    localStorage?.removeItem("pms_user_token");
    // localStorage?.removeItem("pms_token_expiry");
    navigate(PATH.LOGIN);
  };
  return (
    <>
      <div>
        <Modal
          show={showExpiry}
          backdrop="static"
          keyboard={false}
          size="md"
          className="user-modal"
        >
          <Modal.Header className="border-0 ">
            <h2 className="fw-bold"> {"Session expired"}</h2>
          </Modal.Header>

          <Modal.Body className="text-center">
            <h5 className="fw-bold">Your session has expired</h5>
            <p className="fw-bold">Please login in again.</p>
          </Modal.Body>
          <Modal.Footer className="border-0 ">
            <Button
              className="btn-primary border-0 px-3"
              onClick={() => Logout()}
            >
              Relogin
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ParentComponentWithSideBar>{element}</ParentComponentWithSideBar>
    </>
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default ProtectedRoute;
