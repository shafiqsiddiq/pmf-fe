// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../utils/path";
// import { useEffect } from "react";
// import FullscreenLoader from "./FullScreenLoader.jsx";
// import PATH from "../../utils/path.jsx";

function PublicRoute({ element }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("pms_user"));
  const token = localStorage.getItem("pms_user_token");
  
  useEffect(() => {
    ;
    if (token) {
      // Admin dashboard
      user?.loginUser?.roleId === "1"
        ? navigate(PATH.DASHBOARD)
        : user?.loginUser?.roleId === "2"
        ? navigate(PATH.TEAM_LEAD_DASHBOARD)
        : user?.loginUser?.roleId === "3"
        ? navigate(PATH.RESOURCE_DASHBOARD)
        : user?.loginUser?.roleId === "4"
        ? navigate(PATH.RESOURCE_DASHBOARD)
        : "";
    }
  }, [navigate, user]);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (navigate) {
  //     navigate("/user");
  //   }
  // }, [navigate]);
  // if (user === undefined) return <FullscreenLoader />;

  return element;
}

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PublicRoute;
