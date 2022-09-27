import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function AddData() {
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nik: "",
      name: "",
      gender: "",
      dateofbirth: "",
      address: "",
      country: "",
    },
  });

  const Submit = (data) => {
    setForm({
      nik: data.nik,
      name: data.name,
      gender: data.gender,
      dateofbirth: data.dateofbirth,
      address: data.address,
      country: data.country,
    });
  };

  const confirmSubmit = useMutation(async (form) => {
    try {
      // e.preventDefault();

      await API.post("/employees", form);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (form) {
      confirmSubmit.mutate(form);
    } else {
      console.log("no");
    }
  }, [form]);

  function goToHome() {
    navigate("/");
  }

  return (
    <div className="p-2">
      <h1 className="text-center">Tambah Data Baru</h1>

      <div className=" d-flex justify-content-center" onSubmit={handleSubmit()}>
        <form className="formSection" onSubmit={handleSubmit(Submit)}>
          <div className="d-flex flex-column">
            <label htmlFor="nik" className="pb-2">
              NIK
            </label>
            <input
              type="number"
              className={errors.nik ? "input-height validate" : "input-height"}
              {...register("nik", {
                required: "Nik Wajib Di isi,Silahkan Masukan Nik",
              })}
              placeholder={
                errors.nik ? "Nik Wajib Di isi,Silahkan Masukan Nik" : "NIK"
              }
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="name" className="pb-2">
              Nama Lengkap
            </label>
            <input
              className={errors.name ? "input-height validate" : "input-height"}
              type="text"
              {...register("name", { required: "Masukan Nama" })}
              placeholder={
                errors.name ? "Name Wajib Di isi,Silahkan Masukan Name" : "Name"
              }
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="" className="pb-2">
              Jenis Kelamin
            </label>
            <div>
              <input
                type="radio"
                {...register("gender")}
                className="radiobtn"
                value="Laki-Laki"
              />
              <label htmlFor="mele" className="ps-1 pe-3">
                Laki-Laki
              </label>

              <input
                type="radio"
                className="radiobtn"
                {...register("gender")}
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
              {...register("dateofbirth")}
            />
          </div>

          <div className="d-flex flex-column pt-3">
            <label htmlFor="address" className="pb-2">
              Alamat
            </label>
            <textarea className="text-height" {...register("address")} />
          </div>

          <div className="pt-3">
            <label htmlFor="" className="pb-2">
              Negara
            </label>
            <select
              className="input-height input-width"
              {...register("country")}
            >
              <option value="">Pilih Negara</option>
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
            <button type="submit" className="btn-form btn-blue">
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
