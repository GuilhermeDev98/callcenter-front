import React, {useState, useEffect} from 'react'
import { Box, Button, Grid } from '@mui/material';
import CardInfo from './CardInfo';
import WindowIcon from '@mui/icons-material/Window';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CallIcon from '@mui/icons-material/Call';
import StarIcon from '@mui/icons-material/Star';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Api from '../../../Services/Api';

import UserMock from '../../../mocks/UserMock';

const EmployeeInfo = () => {

    const [Employee, SetEmployee] = useState(UserMock)

    const getEmplyeeInfo = () => {
        const userId = localStorage.getItem('call@userId')
        Api.get(`employees/${userId}`).then(r => {
            SetEmployee(r.data)
        }).catch(err => console.log(err))
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
        //getEmplyeeInfo()
    }, [])


    return (
        <Box>
            <Grid container>
                <Grid xs={6}>
                    <CardInfo title="Setor" information={Employee ? Employee.role.name : 'carregando'} icon={<WindowIcon sx={{fontSize: 80, color: '#3D3D44'}} />} />
                </Grid>
                <Grid xs={6}>
                    <CardInfo title="Supervisor" information={Employee ? Employee.team.supervisor.name : 'carregando'} icon={<SupervisedUserCircleIcon sx={{fontSize: 80, color: '#3D3D44'}}  />} />
                </Grid>
                <Grid xs={6}>
                    <Button onClick={() => HandleRealizarChamada()}>Ligar</Button>
                    <Button onClick={() => HandleDesconectar()}>Desconectar</Button>
                    <Button onClick={() => HandleConectar()}>Conectar</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EmployeeInfo;