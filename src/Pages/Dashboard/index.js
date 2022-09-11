import React, {useEffect} from "react";
import { useNavigate, useOutlet } from "react-router-dom";

import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import ButtonGroup from '@mui/material/ButtonGroup';

import Sidebar from '../Layouts/Sidebar'
import StatusOfConnection from '../Layouts/StatusOfConnection'
import ResponsiveAppBar from "../Layouts/ResponsiveAppBar";
import GenerateDashboard from "./GenerateDashboard";

const Dashboard = () => {
    let navigate = useNavigate()
    const outlet = useOutlet()

  const HandleSignOut = () => {
      localStorage.removeItem("call@token")
      localStorage.removeItem("call@userName")
      localStorage.removeItem("call@userId")
      localStorage.removeItem("call@userRole")
      localStorage.removeItem("call@webphone")
      localStorage.removeItem("call@userPermissions")

      return navigate("/login", { replace: true });
  }

    const HandleRealizarChamada = () => {
        window.chamaNumero(4001)
    }

    const HandleDesconectar = () => {
        window.desconectar()
    }

    const HandleConectar = () => {
        window.conectar()
    }

    useEffect(() => {
        const script = document.createElement("script");

        script.src = localStorage.getItem('call@webphone');
        script.async = true;

        document.body.appendChild(script);
    }, [])


  return (
      <div style={{ display: 'flex', background: "#F0F2F5" }}>
          <div style={{ width: '20vw', height: '100vh', display: 'flex', position: 'fixed' }}>
              <div style={{
                  background: '#3D3D44',
                  marginTop: '20px',
                  marginBottom: '20px',
                  marginLeft: '20px',
                  marginRight: '30px',
                  width: '100%',
                  borderRadius: '15px',
                  padding: '20px',
              }}
              >
                  <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <div >
                          <Typography variant="h6" component="h6" style={{ textAlign: 'center', color: "white" }}>
                              SIT® 1.0
                          </Typography>
                          <Divider light style={{ marginTop: '10px', textAlign: 'center' }}>
                            <StatusOfConnection/>
                          </Divider>
                            <Sidebar />
                      </div>
                      <div style={{ marginTop: '10px', alignSelf: 'center' }}>
                          <ButtonGroup variant="primary" size="small" aria-label="outlined primary button group">
                              <IconButton aria-label="play" onClick={HandleSignOut}>
                                  <PowerSettingsNewIcon style={{ color: 'white' }} />
                              </IconButton>
                          </ButtonGroup>
                      </div>
                  </div>
              </div>
          </div>
          <div style={{ width: '80vw', height: '100%', background: '', padding: '20px', color: 'rgb(52, 71, 103)', marginLeft: '20vw' }}>
              <ResponsiveAppBar/>
              <div>
                  {outlet || <GenerateDashboard /> }
              </div>
          </div>
      </div>
    )
}

export default Dashboard
