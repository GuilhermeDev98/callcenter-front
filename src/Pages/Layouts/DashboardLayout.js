import React from "react";

import { useNavigate, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Typography from '@mui/material/Typography';


import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import ButtonGroup from '@mui/material/ButtonGroup';
import PageTitle from "./PageTitle";

import StatusOfConnection from './StatusOfConnection'

const DashboardLayout = () => {

    let navigate = useNavigate()

    const HandleSignOut = () => {
        localStorage.removeItem("call@token")
        localStorage.removeItem("call@userName")
        localStorage.removeItem("call@userId")
        localStorage.removeItem("call@userRole")
        localStorage.removeItem("call@webphone")
        localStorage.removeItem("call@userPermissions")

        return navigate("/login", { replace: true });
    }


    return (
        <div style={{ display: 'flex', background: "#F0F2F5" }}>
            <div style={{ width: '25vw', height: '100vh', display: 'flex', position: 'fixed' }}>
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
            <div style={{ width: '75vw', height: '100%', background: '', padding: '20px', color: 'rgb(52, 71, 103)', marginLeft: '25vw' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }}>
                    <div>
                        <div>
                            <PageTitle title='oi' />
                        </div>
                    </div>
                </div>
                <div>
                  <Outlet/>
                </div>
            </div>
        </div>
    );

}

export default DashboardLayout;
