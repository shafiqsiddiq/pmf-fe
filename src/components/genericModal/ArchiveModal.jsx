import React from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineLock } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineArchive } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

export default function ArchiveModal(props) {
  const { show, handleClose, title, archive } = props;
  //   let navigate = useNavigate();
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        // centered
        className="generate-blog-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="align-self-center ">
          <div className="text-center">
            <AiOutlineLock className="modal-archive-icon-styling mb-3" />
            <h4 className="blog-modal-header mb-3">
              {`Are you sure want to
 Update the password of this ${title} ?`}
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-closeAndBack me-3" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn-primary w-25"
            onClick={() => {
              handleClose();
              archive();
              //   navigate("/generate-blog");
            }}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
