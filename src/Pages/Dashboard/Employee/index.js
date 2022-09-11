import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableWrapper from '../../../Components/Table';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Api from '../../../Services/Api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Employee = () => {
    const [Name, SetName] = useState()
    const [Login, SetLogin] = useState()
    const [Sector, SetSector] = useState()
    const [Password, SetPassword] = useState()
    const [alert, SetAlert] = useState({ open: false, message: '', status: 'success' })
    const [roleModalOpen, SetRoleModalOpen] = useState(false)
    const [page, SetPage] = useState(1)
    const [Employees, SetEmployees] = useState([])
    const [Paginate, SetPaginate] = useState([])
    const [loading, SetLoading] = useState(true)
    const [Sectors, SetSectors] = useState([])
    const [CreateRamal, SetCreateRamal] = useState(true)

    const handleClickOpen = () => {
        SetRoleModalOpen(true);
    };

    const handleClose = () => {
        SetRoleModalOpen(false);
    };

    const HandleSaveEmployee = async () => {
        try {
            const employee = {
                name: Name,
                email: Login,
                sector: Sector,
                password: Password,
                createRamal: CreateRamal
            }
            const { data } = await Api.post('users', employee)
            GetAllEmployees()
            SetRoleModalOpen(false)
            SetAlert({ open: true, message: 'Funcionário criado Com Sucesso', status: 'success' })
        } catch (error) {
            SetAlert({ open: true, message: error.response.data.message, status: 'error' })
        }
    }

    const GetAllEmployees = async (pageToGo = 1) => {
        SetLoading(true)
        try {
            Api.get(`employees?page=${pageToGo}`).then(({ data }) => {
                SetEmployees(data.data)
                SetPaginate(data)
                SetLoading(false)
            })

        } catch (error) {
            SetAlert({ open: true, message: 'Erro Ao Carregar Funcionários', status: 'error' })
        }
    }

    const GetAllSectors = () => {
        try {
            Api.get(`roles`).then(({ data }) => {
                SetSectors(data.data)
                SetLoading(false)
            })

        } catch (error) {
            SetAlert({ open: true, message: 'Erro Ao Carregar Setores', status: 'error' })
        }
    }

    const HandleDeleteEmployee = (id) => {
        SetLoading(true)
        Api.delete(`employees/${id}`).then(({ data }) => {
            GetAllEmployees()
            SetLoading(false)
            SetAlert({ open: true, message: 'Funcionário Deletado Com Sucesso', status: 'success' })
        })
    }


    useEffect(() => {
        GetAllEmployees()
        GetAllSectors()
    }, [])

    return (
        <div>

            <TableWrapper
                tableTitle="Funcionários"
                tableOptions={
                    <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                        <Button onClick={handleClickOpen}>
                            <AddIcon />
                        </Button>
                    </ButtonGroup>
                }
                loading={loading}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Nome</TableCell>
                                <TableCell align="right">Login</TableCell>
                                <TableCell align="right">Setor</TableCell>
                                <TableCell align="right"><SettingsIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Employees.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.role.name}</TableCell>
                                    <TableCell align="right" >
                                        <IconButton onClick={() => HandleDeleteEmployee(row.id)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} sx={{ marginTop: '1%' }}>
                    <Pagination sx={{ margin: '0 auto' }} page={Paginate.current_page} count={Math.ceil(Paginate.total / Paginate.per_page)} onChange={(e, page) => GetAllEmployees(page)} />
                </Stack>
            </TableWrapper>
            <Dialog open={roleModalOpen} onClose={handleClose} fullWidth
                maxWidth="md">
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome Completo"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) => SetName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Login"
                        type="email"
                        fullWidth
                        required
                        onChange={(e) => SetLogin(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Senha"
                        type="text"
                        fullWidth
                        required
                        onChange={(e) => SetPassword(e.target.value)}
                        variant="standard"
                    />
                    <FormControl fullWidth variant="standard" size="small">
                        <InputLabel>Setor de Trabalho</InputLabel>
                        <Select
                            value={Sector}
                            label="Setor"
                            required
                            onChange={(e) => SetSector(e.target.value)}
                        >
                            {Sectors && Sectors.map(sector => <MenuItem key={sector.id} value={sector.name}>{sector.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={CreateRamal}/>} label="Criar Ramal" onChange={(e) => SetCreateRamal(!CreateRamal)} />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={HandleSaveEmployee}>Salvar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => SetAlert({ open: false, message: '', status: 'success' })} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
                <Alert onClose={() => SetAlert({ open: false, message: '', status: 'success' })} severity={alert.status} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Employee
