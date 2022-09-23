/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import ModalDelete from "../components/ModalDelete";

export default function Monitoring() {
  const [show, setShow] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const handleClose = () => setShow(false);

  let navigate = useNavigate();

  const goToAdd = () => {
    navigate("/add-data");
  };

  const goToDetail = (id) => {
    navigate("/data/" + id);
  };

  const goToUpdate = (id) => {
    navigate("/update-data/" + id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    setShow(true);
  };

  // fatch
  const [employees, setEmployees] = useState([]);
  const formatDate = (value) => {
    let date = new Date(value);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return day + "-" + month + "-" + year;
  };
  const employee = async () => {
    try {
      const response = await API.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    employee();
  }, [employees]);

  // delete
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/employees/${id}`);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  // seacrh
  const data = Object.values(employees);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["nik", "name"]);
  function searchTerm(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  // age
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className="p-5">
      <h3 className="pb-3">Aplikasi Data Pribadi</h3>

      <div className="searchSection p-5 ">
        <div className="d-flex flex-column pb-3 ">
          <label htmlFor="nik">Search Nama/NIK</label>
          <input type="text" id="nik" onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="d-flex flex-row-reverse pt-3">
        <button onClick={goToAdd} className="btn-home">
          Add
        </button>
      </div>

      <div className="pt-4">
        <Table bordered>
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>NIK</th>
              <th>Nama Lengkap</th>
              <th>Umur</th>
              <th>Tanggal Lahir</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th>Negara</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm(data).length > 0 ? (
              <>
                {searchTerm(data).map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data?.nik}</td>
                    <td>{data?.name}</td>
                    <td className="text-center">{getAge(data?.dateofbirth)}</td>
                    <td className="text-end">
                      {formatDate(data?.dateofbirth)}
                    </td>
                    <td>{data?.gender}</td>
                    <td>{data?.address}</td>
                    <td className="text-center">{data?.country}</td>
                    <td className="text-center t-action">
                      <button
                        onClick={() => goToDetail(data?.nik)}
                        className="btn-table yellow"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => goToUpdate(data?.nik)}
                        className="btn-table blue"
                      >
                        Edit
                      </button>
                      <button
                        type="submit"
                        onClick={() => handleDelete(data?.nik)}
                        className="btn-table red"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="text-center fw-bold">
                <td colSpan={9}>Data Tidak Ditemukan</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <ModalDelete
        show={show}
        setShow={setShow}
        setConfirmDelete={setConfirmDelete}
      />
    </div>
  );
}
