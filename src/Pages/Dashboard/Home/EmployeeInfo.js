import React from 'react'
import { Box, Grid } from '@mui/material';
import CardInfo from './CardInfo';
import WindowIcon from '@mui/icons-material/Window';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CallIcon from '@mui/icons-material/Call';
import StarIcon from '@mui/icons-material/Star';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import ReviewsIcon from '@mui/icons-material/Reviews';

const EmployeeInfo = () => {

    const sector = localStorage.getItem('call@userRole')
    const username = localStorage.getItem('call@userName').split(' ')[0]

    return (
        <Box>
            <Grid container>
                <Grid xs={6}>
                    <CardInfo title="Setor" information={sector} icon={<WindowIcon sx={{fontSize: 80, color: '#3D3D44'}} />} />
                </Grid>
                <Grid xs={6}>
                    <CardInfo title="Supervisor" information={username} icon={<SupervisedUserCircleIcon sx={{fontSize: 80, color: '#3D3D44'}}  />} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default EmployeeInfo;