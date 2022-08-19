import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';

import Tabulation from './Tabulation'
import Historic from './Historic'
import ClientProfile from './ClientProfile';
import ListOfMemos from './ListOfMemos';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';

import { useDispatch, useSelector } from 'react-redux';
import { GetAllAttendances } from '../../../Redux/slices/AttendanceSlice';

import Api from '../../../Services/Api'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

const PanelAttendance = () => {
  const { userId } = useParams();

  const dispatch = useDispatch()
  const {attendances} = useSelector(state => state)

  const [value, setValue] = useState(0);
  const [Message, SetMessage] = useState(false)
  const [LoadInformations, SetLoadInformations] = useState(true)
  const [AttendanceUUID, SetAttendanceUUID] = useState('')
  const [Client, SetClient] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const GetClientInformations = async () => {
    SetMessage('Carregando Informações do Cliente')
    try {
      const { data } = await Api.get(`clients/${userId}`)
      SetClient(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAttendanceUUID = async () => {
    SetMessage('Gerando Protocolo')
    const { data } = await Api.get('attendances/uuid')
    SetAttendanceUUID(data)
  }

  const getAttendances = async () => {
    SetMessage('Carregando Histórico do Cliente')
    const { data } = await Api.get(`clients/${userId}/attendances`)
    dispatch(GetAllAttendances(data.attendances))
  }

  useEffect(() => {
    GetClientInformations()
    getAttendanceUUID()
    getAttendances()
    SetLoadInformations(false)
  }, [])


  return <DashboardLayout >
    {LoadInformations && <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h5" component="h2">
        Carregando ...
      </Typography>
      <LinearProgress />
    </Box>}
    {!LoadInformations &&
      <>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Tabulação" />
            <Tab label={`Histórico (${attendances.all.length})`} />
            <Tab label="Cliente" />
            <Tab label="Memorandos" />
          </Tabs>
        </Box>
        <Card>
        <TabPanel value={value} index={0}>
          {AttendanceUUID && <Tabulation AttendanceUUID={AttendanceUUID} Client={Client} />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {AttendanceUUID && <Historic />}
        </TabPanel>
        <TabPanel value={value} index={2}>
        {AttendanceUUID && <ClientProfile client={Client}/> }
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ListOfMemos client={Client}/>
        </TabPanel>
        </Card>
      </>
    }
  </DashboardLayout>
}

export default PanelAttendance
