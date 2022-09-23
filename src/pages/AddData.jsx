import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

export default function AddData() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nik: "",
    name: "",
    gender: "",
    dateofbirth: "",
    address: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.post("/employee", form);
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  });

  function goToHome() {
    navigate("/");
  }

  return (
    <div className="p-2">
      <h1 className="text-center">Tambah Data Baru</h1>

      <div className=" d-flex justify-content-center">
        <form className="formSection">
          <div className="d-flex flex-column">
            <label htmlFor="nik" className="pb-2">
              NIK
            </label>
            <input
              type="number"
              className="input-height"
              name="nik"
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="name" className="pb-2">
              Nama Lengkap
            </label>
            <input
              className="input-height"
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="" className="pb-2">
              Jenis Kelamin
            </label>
            <div>
              <input
                type="radio"
                name="gender"
                className="radiobtn"
                onChange={handleChange}
                value="Laki-Laki"
              />
              <label htmlFor="mele" className="ps-1 pe-3">
                Laki-Laki
              </label>

              <input
                type="radio"
                name="gender"
                className="radiobtn"
                onChange={handleChange}
                value="Perempuan"
              />
              <label htmlFor="female" className="ps-1 pe-3">
                Perempuan
              </label>
            </div>
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="date" className="pb-2" dirName="age">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="input-height"
              name="dateofbirth"
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="address" className="pb-2">
              Alamat
            </label>
            <textarea
              className="text-height"
              name="address"
              onChange={handleChange}
            />
          </div>

          <div className="pt-3">
            <label htmlFor="" className="pb-2">
              Negara
            </label>
            <select
              className="input-height input-width"
              name="country"
              onChange={handleChange}
            >
              <option value="" className="defaultOption">
                Pilih Negara
              </option>
              <option value="Indonesia">Indonesia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Singapura">Singapura</option>
              <option value="Thailand">Thailand</option>
              <option value="Amerika">Amerika</option>
              <option value="Jepang">Jepang</option>
              <option value="China">China</option>
            </select>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="btn-form btn-blue"
              onClick={(e) => handleSubmit.mutate(e)}
            >
              Simpan
            </button>
            <button onClick={goToHome} className="btn-form btn-gray">
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
