import React, {useState} from 'react'

import PlayArrow from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import CallEndIcon from '@mui/icons-material/CallEnd';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import PhonePausedIcon from '@mui/icons-material/PhonePaused';
import Api from '../../Services/Api';
import { data } from 'autoprefixer';

const StatusOfConnection = () => {

    const [Status, SetStatus] = useState('')
    const [PrepareToPause, SetPrepareToPause] = useState(false)
    const [ClientNumber, SetClientNumber] = useState()

    window.onmessage = function(e) {
        //quando receber uma ligacao
        if (e.data.message == 'chegandoChamada') {
          SetStatus('chegando_chamada')
          
          const sanityzeNumber = e.data.numeroChegando.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "")

            try {
                Api.get(`clients/search/${sanityzeNumber}`).then(({data}) => {
                    if(data.length >= 1){
                        window.open(`http://localhost:3000/dashboard/attendance/${data[0].registration}`,'_blank');
                    }
                })
            } catch ({ response }) {
                console.log(response)
            }
        }

        if (e.data.message == 'status') {
            console.log(e.data.status)
            SetStatus(e.data.status)
        }
    }

    const HanldleSearchUserInformations = () => {
        const sanityzeNumber = ClientNumber.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "")

        try {
            Api.get(`clients/search/${sanityzeNumber}`).then(({data}) => {
                if(data.length >= 1){
                    window.open(`http://localhost:3000/dashboard/attendance/${data[0].registration}`,'_blank');
                }
            })
        } catch ({ response }) {
            console.log(response)
        }
    }
    

    const HandleEncerrarChamada = () => {
        window.desligaChamada()
        if(PrepareToPause){
            window.desconectar()
            SetStatus('desconectado_pausa')
            SetPrepareToPause(false)
        }
    }

    const HandleAtenderChamada = () => {
        window.atender()
    }

    const HandleConectar = () => {
        window.entrarNaFila(8426479)
        window.conectar()
    }

    const HandleDesconectar = () => {
        window.desconectar()
    }

    const HandleEncerrarChamadaEntrarPausa = () => {
        SetPrepareToPause(true)
    }

    const HandleEntrarPausa = () => {
        window.pausarNaFila(8426479)
    }

    //Status Possiveis = conectado, desconectado, chamando, encerrada, conversando
    if(Status == '' | Status == 'desconectado'){
        return (
            <>
                <IconButton aria-label="play" size="large" onClick={HandleConectar}>
                    <CallEndIcon style={{ color: 'red' }} />
                </IconButton>
            </>
        )
    }

    if(Status == 'desconectado_pausa'){
        return (
            <>
                <IconButton aria-label="play" size="large" onClick={HandleConectar}>
                    <PhonePausedIcon style={{ color: 'yellow' }} />
                </IconButton>
            </>
        )
    }

    if(Status == 'conectado' | Status == 'encerrada'){
        return (
            <>
                <IconButton aria-label="play" size="large" onClick={HandleDesconectar}>
                    <CallEndIcon style={{ color: 'green' }} />
                </IconButton>
                <IconButton aria-label="play" size="10x" onClick={HandleEntrarPausa}>
                    <PhonePausedIcon style={{ color: (PrepareToPause ? 'green' : 'yellow') }} />
                </IconButton>
            </>
        )
    }

    if(Status == 'chegando_chamada'){
        return (
            <>
                <IconButton aria-label="play" size="10x" onClick={HandleAtenderChamada}>
                    <RingVolumeIcon style={{ color: 'blue' }} />
                </IconButton>
            </>
        )
    }

    if(Status == 'chamando'){
        return (
            <>
                <IconButton aria-label="play" size="10x" onClick={HandleEncerrarChamada}>
                    <PhoneInTalkIcon style={{ color: 'blue' }} />
                </IconButton>
            </>
        )
    }

    if(Status == 'conversando'){
        return (
            <>
                <IconButton aria-label="play" size="10x" onClick={HandleEncerrarChamada}>
                    <CallEndIcon style={{ color: 'red' }} />
                </IconButton>
                <IconButton aria-label="play" size="10x" onClick={HandleEncerrarChamadaEntrarPausa}>
                    <PhonePausedIcon style={{ color: (PrepareToPause ? 'green' : 'yellow') }} />
                </IconButton>
            </>
        )
    }
}

    

export default StatusOfConnection