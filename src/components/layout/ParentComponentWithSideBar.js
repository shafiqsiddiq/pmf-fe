

import { Header } from "./Header";
import Sidebar from "./SideBar";
// import swal from 'sweetalert2'
export function ParentComponentWithSideBar({ children, ...rest }) {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div
          className="container-fluid pb-4"
          style={{
            marginTop: "78px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
