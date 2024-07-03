import { toast } from "react-toastify";

function Notification(data, condition) {
  if (condition === "success") {
    toast.success(data, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "print-data",
      progress: undefined,
      theme: "light",
      //   theme: "colored",
    });
  } else {
    toast.error(data, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
export { Notification };
