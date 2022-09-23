import { Modal } from "react-bootstrap";
import React from "react";

export default function ModalDelete({ show, setShow, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <div className="p-3 d-flex flex-column">
        <div className="ps-3 pt-3">
          <h5>Apakah Anda yakin Ingin Menghapus Data ?</h5>
        </div>

        <div className=" d-flex justify-content-end pt-4">
          <button className="btn-blue btn-modal" onClick={handleDelete}>
            Ok
          </button>
          <button className="btn-gray btn-modal" onClick={() => setShow(false)}>
            Batal
          </button>
        </div>
      </div>
    </Modal>
  );
}
