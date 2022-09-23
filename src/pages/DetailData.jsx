import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DetailData() {
  const { id } = useParams();
  const navigate = useNavigate();

  let { data: employee } = useQuery("employeeChache", async () => {
    const response = await API.get("/employees/" + id);
    return response.data;
  });

  function goToHome() {
    navigate("/");
  }

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
              value={employee?.nik}
              disabled
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="name" className="pb-2">
              Nama Lengkap
            </label>
            <input
              className="input-height"
              type="text"
              value={employee?.name}
              disabled
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
                disabled
                checked={employee?.gender === "Laki-Laki"}
              />
              <label htmlFor="mele" className="ps-1 pe-3">
                Laki-Laki
              </label>
              <input
                type="radio"
                name="gender"
                className="radiobtn"
                disabled
                checked={employee?.gender === "Perempuan"}
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
              value={employee?.dateofbirth?.substr(0, 10)}
              disabled
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="address" className="pb-2">
              Alamat
            </label>
            <textarea
              className="text-height"
              value={employee?.address}
              disabled
            />
          </div>

          <div className="pt-3">
            <label htmlFor="" className="pb-2">
              Negara
            </label>
            <select className="input-height input-width" disabled>
              <option value={employee?.country}>{employee?.country}</option>
            </select>
          </div>

          <div className="pt-3">
            <button onClick={goToHome} className="btn-form btn-gray">
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
