import React from 'react'
import { Box, Grid } from '@mui/material';
import CardInfo from './CardInfo';
import WindowIcon from '@mui/icons-material/Window';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CallIcon from '@mui/icons-material/Call';

const EmployeeInfo = () => {
    return (
        <Box>
            <Grid container>
                <Grid xs={4}>
                    <CardInfo title="Setor" information="Qualidade" icon={<WindowIcon sx={{fontSize: 80, color: '#3D3D44'}} />} />
                </Grid>
                <Grid xs={4}>
                    <CardInfo title="Supervisor" information="Guilherme Santos" icon={<SupervisedUserCircleIcon sx={{fontSize: 80, color: '#3D3D44'}}  />} />
                </Grid>
                <Grid xs={4}>
                    <CardInfo title="Atendimentos" information="10"  icon={<CallIcon sx={{fontSize: 80, color: '#3D3D44'}}  />} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default EmployeeInfo;