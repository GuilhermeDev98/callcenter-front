import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';


import { CardContent, CardHeader, Input } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';


import TextField from '@mui/material/TextField';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import TimelineOfMemos from './TimelineOfMemos';
import AddCommentIcon from '@mui/icons-material/AddComment';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, DialogContent } from '@mui/material';

import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';

import { useSelector, useDispatch } from 'react-redux';

import Api from '../../../Services/Api';

import { GetAllAttendances } from '../../../Redux/slices/AttendanceSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  width: 500,
};


const Historic = ({ Attendances }) => {

  const {attendances} = useSelector(state => state)
  const dispatch = useDispatch()
  const { userId } = useParams();


  const [ModalOpen, SetModalOpen] = useState(false)
  const [ModalNewMemo, SetModalNewMemo] = useState(false)
  const [AttendenceSelected, SetAttendenceSelected] = useState('')
  const [status, SetStatus] = useState()
  const [forwarding, SetForwarding] = useState()
  const [Memo, SetMemo] = useState('')


  const handleOpen = (attendance, index) => {
    SetModalOpen(true)
    SetAttendenceSelected(attendance)
    SetStatus(attendance.status)
    SetForwarding(attendance.forwarding)
  }

  const ShowUser = () => {
    return AttendenceSelected ? `${AttendenceSelected.creator.name}(${AttendenceSelected.creator.id})` : ''
  }

  const canEditProtocol = () => {
    return AttendenceSelected.status == 'closed' ? false : true
  }

  const handleClose = () => SetModalOpen(false);

  const handleOpenNewMemo = () => SetModalNewMemo(true);
  const handleCloseNewmemo = () => SetModalNewMemo(false);

  const handleChangeStatus = (event) => {
    SetStatus(event.target.value);
  }

  const handleChangeForwarding = (event) => {
    SetForwarding(event.target.value);
  }

  const HandleCreateNewMemo = async () => {
    try {
      const { data } = await Api.post('memos', {
        "description": Memo,
        "user_id": AttendenceSelected.creator.id,
        "attendance_id": AttendenceSelected.id
      })
      SetMemo()
      SetModalNewMemo(false)
    } catch (error) {
      console.log(error)
    }
  }

  const HandleEditProtocol = async () => {
    try {
      const { data } = await Api.put(`attendances/${AttendenceSelected.id}`, {
        status,
        forwarding
      })

      getAllAttendances()
      SetModalOpen(false)

      return (<Snackbar
        autoHideDuration={6000}
        open={true}
        message="Editado Com Sucesso !"
      />)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllAttendances = async () => {
    const AttendanceData = await Api.get(`clients/${userId}/attendances`)
    dispatch(GetAllAttendances(AttendanceData.data.attendances))
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Protocolo</TableCell>
              <TableCell align="center">Classificação</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Data De Criação</TableCell>
              <TableCell align="center"><SettingsIcon /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.all.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.protocol}
                </TableCell>
                <TableCell align="center">{row.classification}</TableCell>
                <TableCell align="center">
                  {row.status == 'open' && 'Aberto'}
                  {row.status == 'closed' && 'Fechado'}
                  {row.status == 'in_treatment' && 'Em Tratamento'}
                </TableCell>
                <TableCell align="center">{row.created_at}</TableCell>
                <TableCell align="center">
                  <VisibilityIcon onClick={() => handleOpen(row, index)} />
                  <ShareIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        fullScreen
        open={ModalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {AttendenceSelected.protocol} - {ShowUser()} - {AttendenceSelected.created_at}
            </Typography>
            {canEditProtocol() && <Button autoFocus color="inherit" onClick={handleOpenNewMemo}>
              <AddCommentIcon />
            </Button>}
          </Toolbar>
        </AppBar>
        <Grid sx={{ margin: '5%' }}>
          <Grid container spacing={2} sx={{ padding: '10px' }}>
            <Grid item xs={4} sx={{ marginBottom: '5px' }}>
              <Card sx={{ padding: '2%' }}>
                <TextField label="Protocolo" value={AttendenceSelected.protocol} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                <Grid container spacing={2}>
                  <Grid item xs={6} sx={{ marginBottom: '5px' }}>
                    <TextField label="Classificação" value={AttendenceSelected.classification} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                  </Grid>
                  <Grid item xs={6} sx={{ marginBottom: '5px' }}>
                    <TextField label="Canal de Entrada" value={AttendenceSelected.input_channel} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                  </Grid>
                  <Grid item xs={6} sx={{ marginBottom: '5px' }}>
                    <FormControl fullWidth variant="standard" size="small" disabled={!canEditProtocol()}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={status}
                        onChange={handleChangeStatus}
                      >
                        <MenuItem value={"open"}>Aberto</MenuItem>
                        <MenuItem value={"closed"}>Fechado</MenuItem>
                        <MenuItem value={"in_treatment"}>Em Tratamento</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sx={{ marginBottom: '5px' }}>
                    <FormControl fullWidth variant="standard" size="small" disabled={!canEditProtocol()}>
                      <InputLabel>Encaminhamento</InputLabel>
                      <Select
                        value={forwarding}
                        onChange={handleChangeForwarding}
                      >
                        <MenuItem value={"Procedente"}>Procedente</MenuItem>
                        <MenuItem value={"Improcedente"}>Improcedente</MenuItem>
                        <MenuItem value={"Em Análise"}>Em Análise</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Canal De Retorno" value={AttendenceSelected.return_channel} disabled variant="standard" fullWidth size="small" sx={{ marginBottom: '5px' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Telefone de Retorno" value={AttendenceSelected.return_phone} disabled variant="standard" fullWidth size="small" sx={{ marginBottom: '5px' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Nome Do Contato" value={AttendenceSelected.contact_name} disabled variant="standard" fullWidth size="small" sx={{ marginBottom: '5px' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Resumo" value={AttendenceSelected.summary} disabled variant="standard" fullWidth size="small" sx={{ marginBottom: '5px' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Memorando" value={AttendenceSelected.memo} disabled variant="standard" multiline fullWidth size="small" sx={{ marginBottom: '5px' }} />
                  </Grid>
                </Grid>

                {canEditProtocol() && <Button variant="contained" component="span" onClick={() => HandleEditProtocol()} fullWidth sx={{ marginBottom: '5px' }}>
                  Salvar
                </Button>}
              </Card>

            </Grid>
            <Grid item xs={8} sx={{ marginBottom: '5px' }}>
              <Card>
                <CardHeader title="Timeline" />
                <Divider />
                <CardContent>
                  <TimelineOfMemos AttendanceId={AttendenceSelected.id} />
                </CardContent>

              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>

      <Dialog
        open={ModalNewMemo}
        onClose={handleCloseNewmemo}
        TransitionComponent={Transition}
      >
        <DialogTitle>Novo Memorando</DialogTitle>
        <DialogContent style={style}>
          <TextField
            autoFocus
            margin="dense"
            id="memo"
            label="Memorando"
            type="text"
            variant="standard"
            multiline
            fullWidth
            onChange={(e) => SetMemo(e.target.value)}
          />
          <label htmlFor="contained-button-file" >
            <Input accept="image/*" id="contained-button-file" multiple type="file" sx={{ display: 'none' }} />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewmemo}>Fechar</Button>
          <Button onClick={HandleCreateNewMemo}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Historic
