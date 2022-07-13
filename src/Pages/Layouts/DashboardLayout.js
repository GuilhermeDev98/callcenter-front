import React from "react";
import { useHistory } from "react-router-dom";
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

import FaceIcon from '@mui/icons-material/PlayArrow';
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

const DashboardLayout = (props) => {

    let history = useHistory()
    const canAccess = localStorage.getItem("call@canAccess")

    const HandleSignOut = () => {
        localStorage.removeItem("call@token")
        localStorage.removeItem("call@userName")
        localStorage.removeItem("call@userId")
        localStorage.removeItem("call@userRole")

        return history.push('/login')
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
                                <IconButton aria-label="play" size="large">
                                    <FaceIcon style={{ color: 'white' }} />
                                </IconButton>
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
                        <div role="presentation" onClick={() => console.log('presentation')}>
                            {/* <Breadcrumbs aria-label="breadcrumb">
                                <Link underline="hover" color="inherit" href="/">
                                    MUI
                                </Link>
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href="/material-ui/getting-started/installation/"
                                >
                                    Core
                                </Link>
                                <Link
                                    underline="hover"
                                    color="text.primary"
                                    href="/material-ui/react-breadcrumbs/"
                                    aria-current="page"
                                >
                                    Breadcrumbs
                                </Link>
                            </Breadcrumbs> */}
                            <PageTitle title={props.title} />
                        </div>
                    </div>
                </div>
                <div>
                    {canAccess == 'true' && props.children}
                    {canAccess == "false" && (
                        <Paper sx={{textAlign: 'center'}}>
                            <DoDisturbIcon fontSize="large" sx={{ color: 'red', paddingTop: '2%', fontSize: 100 }} />
                            <h1>Você Não Pode Acessar Esta Página</h1>
                        </Paper>
                    )}
                </div>
            </div>
        </div>
    );

}

export default DashboardLayout;
