import React, { useState } from "react";

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Dashboard from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemIcon from '@mui/material/ListItemIcon';


import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import GroupIcon from '@mui/icons-material/Group';
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DomainIcon from '@mui/icons-material/Domain';

import Api from '../../Services/Api'
import Can from '../../Components/Can'

const Sidebar = () => {

    const [SearchClient, SetSearchClient] = useState(false)
    const [DialogSearchClient, SetDialogSearchClient] = useState(false)
    const [Clients, SetClients] = useState()

    const HandleOpenDialogSearchClient = () => SetDialogSearchClient(true)
    const HandleCloseDialogSearchClient = () => SetDialogSearchClient(false)

    const SeachClient = async (search) => {
        if (search.length == 0) {
            return;
        }

        SetSearchClient(true)
        try {
            const { data } = await Api.get(`clients/search/${search}`)
            SetClients(data)
            SetSearchClient(false)
        } catch ({ response }) {
            console.log(response)
            SetSearchClient(false)
        }
    }

    return (
        <>
            <List>
                <Can permission='dashboard.show'>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px', }}>
                            <ListItemIcon style={{ background: '' }}>
                                <DashboardIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white', fontSize: '5px' }} primary="Dashboard" />
                        </ListItem>
                    </Link>
                </Can>
                <Can permission='attendance.show'>
                    <Link style={{ textDecoration: 'none' }} onClick={() => HandleOpenDialogSearchClient()}>
                        <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px', }}>
                            <ListItemIcon style={{ background: '' }}>
                                <SupportAgentIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white', fontSize: '5px' }} primary="Atendimento" />
                        </ListItem>
                    </Link>
                </Can>
                <Can permission='role.show'>
                    <Link to="/dashboard/roles" style={{ textDecoration: 'none' }}>
                        <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px', }}>
                            <ListItemIcon style={{ background: '' }}>
                                <DomainIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white', fontSize: '5px' }} primary="WorkPlace" />
                        </ListItem>
                    </Link>
                </Can>
                <Can permission='permission.show'>
                    <Link to="/dashboard/permissions" style={{ textDecoration: 'none' }}>
                        <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px', }}>
                            <ListItemIcon style={{ background: '' }}>
                                <AccountTreeIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white', fontSize: '5px' }} primary="Permissões" />
                        </ListItem>
                    </Link></Can>
                <Can permission='client.show'>
                    <Link to="/dashboard/clients" style={{ textDecoration: 'none' }}>
                        <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px', }}>
                            <ListItemIcon style={{ background: '' }}>
                                <GroupIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white', fontSize: '5px' }} primary="Novo Cliente" />
                        </ListItem>
                    </Link>
                </Can>
                <Can permission='employee.show'>
                    <Link to="/dashboard/employees" style={{ textDecoration: 'none' }}>
                        <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px', }}>
                            <ListItemIcon style={{ background: '' }}>
                                <BadgeIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white', fontSize: '5px' }} primary="Funcionários" />
                        </ListItem>
                    </Link>
                </Can>
                <Can permission='employee.show'>
                    <Link to="/dashboard/employees" style={{ textDecoration: 'none' }}>
                        <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px', }}>
                            <ListItemIcon style={{ background: '' }}>
                                <EngineeringIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'white', fontSize: '5px' }} primary="Configurações" />
                        </ListItem>
                    </Link>
                </Can>
            </List>
            <Dialog open={DialogSearchClient} onClose={HandleCloseDialogSearchClient} fullWidth>
                <DialogTitle>Buscar Cliente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Digite o Id ou o CPF do Cliente
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => SeachClient(e.target.value)}
                    />
                    {SearchClient && <LinearProgress />}
                    {Clients && <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Nome Completo</TableCell>
                                    <TableCell align="right">CPF</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Clients.map((row) => (
                                    <TableRow
                                        key={row.registration}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <Link to={`/dashboard/attendance/${row.registration}`} style={{ textDecoration: 'none' }}>
                                            <TableCell component="th" scope="row">
                                                {row.registration}
                                            </TableCell>
                                        </Link>
                                        <TableCell align="right">{row.full_name}</TableCell>
                                        <TableCell align="right">{row.cpf}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={HandleCloseDialogSearchClient}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Sidebar
