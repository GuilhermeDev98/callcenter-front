import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './Services/Auth';

import Login from './Pages/Auth/Login'
import Dashboard from './Pages/Dashboard'
import Roles from './Pages/Dashboard/Role';
import PanelAttendance from './Pages/Dashboard/Attendance';
import Client from './Pages/Dashboard/Client'
import Employee from './Pages/Dashboard/Employee';
import Permissions from './Pages/Dashboard/Permission';
import Workplace from "./Pages/Dashboard/Workplace";


const  PrivateRoute = () => {
  return <Outlet />;
}

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}  />
        <Route path="/login" element={<Login/>} />

        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path="/dashboard" element={ <Dashboard/> } >
            <Route path="roles" element={ <Roles/> } />
            <Route path="permissions" element={ <Permissions/> } />
            <Route path="attendance/:userId" element={ <PanelAttendance/> } />
            <Route path="clients" element={ <Client/> } />
            <Route path="employees" element={ <Employee/> } />
            <Route path="workplace" element={ <Workplace/> } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Rotas
