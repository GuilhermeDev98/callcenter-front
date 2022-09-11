import React, {useState, useEffect} from "react";

import { useNavigate, Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import PlayArrow from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import DialpadIcon from '@mui/icons-material/Dialpad';
import PauseIcon from '@mui/icons-material/Pause';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { PropaneSharp } from "@mui/icons-material";
import PageTitle from "./PageTitle";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import NotCanAccessImage from '../../assets/images/notCanAccess.png'
import StatusOfConnection from './StatusOfConnection'

const DashboardLayout = (props) => {

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
                                <StatusOfConnection />
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
                            <PageTitle title={props.title} />
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
