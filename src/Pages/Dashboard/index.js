import React, {useState, useEffect} from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import Timer from '../../Components/Timer'
import EmployeeInfo from "./Home/EmployeeInfo";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
const Dashboard = () => {

  return <DashboardLayout title="Dashboard">
    <EmployeeInfo/>
    <Box>
    <Grid container>
      <Grid xs={6}>Chat Gestor</Grid>
      <Grid xs={6}>Chat Equipe</Grid>
    </Grid>
    </Box>
  </DashboardLayout>
}

export default Dashboard
