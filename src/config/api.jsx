import axios from "axios";

export const API = axios.create({
  baseURL: "https://employee-istidata.herokuapp.com/api/v1/employees",
});
