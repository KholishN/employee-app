import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function DetailData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nik: "",
    name: "",
    gender: "",
    dateofbirth: "",
    address: "",
    country: "",
  });

  let { data: employee } = useQuery("employeeChache", async () => {
    const response = await API.get("/employees/" + id);
    return response.data;
  });

  function goToHome() {
    navigate("/");
  }

  useEffect(() => {
    if (employee) {
      setForm({
        ...form,
        nik: employee?.nik,
        name: employee?.name,
        gender: employee?.gender,
        dateofbirth: employee?.dateofbirth,
        address: employee?.address,
        country: employee?.country,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.patch("/employees/" + id, form);
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  });

  return (
    <div className="p-2">
      <h1 className="text-center">Data Pribadi {employee?.name}</h1>

      <div className=" d-flex justify-content-center">
        <form className="formSection">
          <div className="d-flex flex-column">
            <label htmlFor="nik" className="pb-2">
              NIK
            </label>
            <input
              type="number"
              className="input-height"
              value={form.nik}
              onChange={handleChange}
              name="nik"
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="name" className="pb-2">
              Nama Lengkap
            </label>
            <input
              className="input-height"
              type="text"
              value={form.name}
              onChange={handleChange}
              name="name"
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
                checked={form.gender === "Laki-Laki"}
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
                checked={form.gender === "Perempuan"}
                onChange={handleChange}
                value="Perempuan"
              />
              <label htmlFor="female" className="ps-1 pe-3">
                Perempuan
              </label>
            </div>
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="date" className="pb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="input-height"
              value={form.dateofbirth.substr(0, 10)}
              onChange={handleChange}
              name="dateofbirth"
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="address" className="pb-2">
              Alamat
            </label>
            <textarea
              className="text-height"
              value={form.address}
              onChange={handleChange}
              name="address"
            />
          </div>

          <div className="pt-3">
            <label htmlFor="" className="pb-2">
              Negara
            </label>
            <select
              className="input-height input-width"
              onChange={handleChange}
              name="country"
            >
              <option value="">{form.country}</option>
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
              className="btn-form btn-blue"
              onClick={(e) => handleSubmit.mutate(e)}
            >
              Ubah
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
