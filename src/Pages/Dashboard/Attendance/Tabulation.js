import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Api from '../../../Services/Api';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Input = styled('input')({
  display: 'none',
});

const Tabulation = ({ AttendanceUUID, Client }) => {

  const [alert, SetAlert] = useState({ open: false, message: '', status: 'success' })
  const [protocol, SetProtocol] = useState(AttendanceUUID)
  const [client, SetClient] = useState(Client)
  const [classification, SetClassification] = useState('Informação')
  const [enter_channel, SetEnterChannel] = useState('Telefone')
  const [status, SetStatus] = useState('open')
  const [forwarding, SetForwarding] = useState('Em Análise')
  const [return_channel, SetReturnChannel] = useState('Telefone')
  const [return_phone, SetReturnPhone] = useState(client.contact_phone_1)
  const [contact_name, SetContactName] = useState(client.contact_name_1)
  const [summary, SetSummary] = useState('')
  const [memo, SetMemo] = useState('')

  const handleChangeClassification = (event) => {
    SetClassification(event.target.value);
  }

  const handleChangeEnterChannel = (event) => {
    SetEnterChannel(event.target.value);
  }

  const handleChangeStatus = (event) => {
    SetStatus(event.target.value);
  }

  const handleChangeForwarding = (event) => {
    SetForwarding(event.target.value);
  }

  const handleChangeReturnChannel = (event) => {
    SetReturnChannel(event.target.value);
  }

  const getAttendanceUUID = async () => {
    const { data } = await Api.get('attendances/uuid')
    SetProtocol(data)
  }

  const handleStoreAttendance = async () => {
    console.log(client)
    const attendanceInformations = {
      'protocol': protocol,
      classification,
      'input_channel': enter_channel,
      status,
      forwarding,
      return_channel,
      return_phone,
      contact_name,
      summary,
      memo,
      'client_id': client.user_id,
      'creator_id': 1
    }

    try {
      const { data } = await Api.post('attendances', attendanceInformations)
      SetAlert({ open: true, message: `Tabulação Realizada Com Sucesso`, status: 'success' })
      cleanFields()
    } catch (error) {
      console.log(error)
    }

  }

  const cleanFields = () => {
    SetClassification('')
    SetEnterChannel('')
    SetStatus('')
    SetForwarding('')
    SetReturnChannel('')
    SetReturnPhone('')
    SetContactName('')
    SetSummary('')
    SetMemo('')
    getAttendanceUUID()
  }

  useEffect(() => {
  }, [])

  return <>
    <Box>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => SetAlert({ open: false, message: '', status: 'success' })} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Alert onClose={() => SetAlert({ open: false, message: '', status: 'success' })} severity={alert.status} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <TextField label="Protocolo" value={protocol} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />

      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ marginBottom: '5px' }}>
          <FormControl fullWidth variant="standard" size="small">
            <InputLabel>Classificação</InputLabel>
            <Select
              value={classification}
              label="Classificação"
              onChange={handleChangeClassification}
            >
              <MenuItem value={"Informação"}>Informação</MenuItem>
              <MenuItem value={"Reclamação"}>Reclamação</MenuItem>
              <MenuItem value={"Retenção"}>Retenção</MenuItem>
              <MenuItem value={"Sugestão"}>Sugestão</MenuItem>
              <MenuItem value={"Elogio"}>Elogio</MenuItem>
            </Select>
          </FormControl>
          <Skeleton variant="text" sx={{ display: 'none' }} />

        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard" size="small">
            <InputLabel>Canal de Entrada</InputLabel>
            <Select
              value={enter_channel}
              label="Canal de Entrada"
              onChange={handleChangeEnterChannel}
            >
              <MenuItem value={"Telefone"}>Telefone</MenuItem>
              <MenuItem value={"E-mail"}>E-mail</MenuItem>
              <MenuItem value={"Chat"}>Chat</MenuItem>
              <MenuItem value={"Redes sociais"}>Redes sociais</MenuItem>
              <MenuItem value={"SMS"}>SMS</MenuItem>
              <MenuItem value={"Videoconferência"}>Videoconferência</MenuItem>

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: '5px' }} >
          <FormControl fullWidth variant="standard" size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={handleChangeStatus}
            >
              <MenuItem value={"open"}>Aberto</MenuItem>
              <MenuItem value={"closed"}>Fechado</MenuItem>
              <MenuItem value={"in_treatment"}>Em Tratamento</MenuItem>
            </Select>
          </FormControl>
          <Skeleton variant="text" sx={{ display: 'none' }} />

        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard" size="small">
            <InputLabel>Encaminhamento</InputLabel>
            <Select
              value={forwarding}
              label="Canal de Entrada"
              onChange={handleChangeForwarding}
            >
              <MenuItem value={"Procedente"}>Procedente</MenuItem>
              <MenuItem value={"Improcedente"}>Improcedente</MenuItem>
              <MenuItem value={"Em Análise"}>Em Análise</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="standard" size="small">
            <InputLabel>Canal De Retorno</InputLabel>
            <Select
              value={return_channel}
              label="Canal De Retorno"
              onChange={handleChangeReturnChannel}
            >
              <MenuItem value={"Telefone"}>Telefone</MenuItem>
              <MenuItem value={"E-mail"}>E-mail</MenuItem>
              <MenuItem value={"Chat"}>Chat</MenuItem>
              <MenuItem value={"Redes sociais"}>Redes sociais</MenuItem>
              <MenuItem value={"SMS"}>SMS</MenuItem>
              <MenuItem value={"Videoconferência"}>Videoconferência</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Telefone de Retorno" value={client.contact_phone_1} variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={e => SetReturnPhone(e.target.value)} fullWidth size="small" sx={{ marginBottom: '5px' }} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Nome Contato" value={client.contact_name_1} variant="standard" onChange={e => SetContactName(e.target.value)} fullWidth size="small" sx={{ marginBottom: '5px' }} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Resumo" value={summary} variant="standard" onChange={e => SetSummary(e.target.value)} fullWidth size="small" sx={{ marginBottom: '5px' }} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Memorando" value={memo} variant="standard" onChange={e => SetMemo(e.target.value)} multiline fullWidth size="small" sx={{ marginBottom: '5px' }} />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="contained-button-file" >
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained" component="span" fullWidth sx={{ marginBottom: '5px' }}>
              Upload de Arquivos
            </Button>
          </label>
          <Card>
            <List dense={true}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <a href="https://www.google.com.br" target="_blank">
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </a>
                </ListItemAvatar>
                <ListItemText
                  primary="Nome Do Arquivo"
                />
              </ListItem>
            </List>
          </Card>
          <Button variant="contained" component="span" color='success' onClick={handleStoreAttendance} fullWidth sx={{ marginTop: '2%' }}>
            Salvar Tabulação
          </Button>
        </Grid>
      </Grid>

    </Box>
  </>
}

export default Tabulation
