import React, { useState, useEffect } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import Timer from '../../Components/Timer'
import EmployeeInfo from "./Home/EmployeeInfo";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Can from "../../Components/Can";
import AttendancesOpen from "./Home/Charts/AttendancesOpen";

const Dashboard = () => {

  return <DashboardLayout title="Dashboard">
    <EmployeeInfo />
  </DashboardLayout>
}

export default Dashboard
