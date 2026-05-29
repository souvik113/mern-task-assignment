import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;