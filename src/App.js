import {BrowserRouter,Routes,Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css";
import './styles/index.css';


import Monitoring from "./pages/Monitoring";
import AddData from "./pages/AddData";
import UpdateData from "./pages/UpdateData";
import DetailData from "./pages/DetailData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Monitoring/>} />
        <Route path="/add-data" element={<AddData/>} />
        <Route path="/update-data/:id" element={<UpdateData/>} />
        <Route path="/data/:id" element={<DetailData/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
