import React, { useState, useEffect } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";

import TableWrapper from '../../Components/Table';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Divider from '@mui/material/Divider';


import Api from '../../Services/Api'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const Permissions = () => {
    const [roles, SetRoles] = useState([])
    const [permissions, SetPermissions] = useState([])
    const [roleModalOpen, SetRoleModalOpen] = useState(false)
    const [permission, SetPermission] = useState('')
    const [alert, SetAlert] = useState({ open: false, message: '', status: 'success' })
    const [loading, SetLoading] = useState(true)
    const [Paginate, SetPaginate] = useState([])

    const GetAllRoles = async (pageToGo = 1) => {
        SetLoading(true)
        try {
            const { data } = await Api.get(`roles/?page=${pageToGo}`).then(({data}) => {
                SetRoles(data.data)
                SetLoading(false)
                SetPaginate(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const GetAllPermissions = async () => {
        try {
            const { data } = await Api.get('permissions')
            SetPermissions(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const HandleStorePermission = async () => {
        try {
            Api.post('roles', { "name": permission }).then(({ data }) => {
                GetAllRoles()
                SetRoleModalOpen(false)
                SetAlert({ open: true, message: 'Regra Cadastrada Com Sucesso !', status: 'success' })
            }).catch((error) => {
                SetAlert({ open: true, message: 'Erro Ao Cadastrar Regra !', status: 'error' })
                console.log(error.context)
            })
        } catch (error) {
        }
    }


    const handleClickOpen = () => {
        SetRoleModalOpen(true);
    };

    const handleClose = () => {
        SetRoleModalOpen(false);
    };

    useEffect(() => {
        GetAllRoles()
        GetAllPermissions()
    }, [])

    return (
        <DashboardLayout>
            <TableWrapper
                tableTitle="Regras"
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
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">
                                    <SettingsIcon />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles && roles.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} sx={{marginTop: '1%'}}>
                    <Pagination sx={{ margin: '0 auto'}}  page={Paginate.current_page} count={Math.ceil(Paginate.total/Paginate.per_page)} onChange={(e, page) => GetAllRoles(page)} />
                </Stack>
            </TableWrapper>

            <Dialog open={roleModalOpen} onClose={handleClose}>
                <DialogTitle>Nova Role</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => SetPermission(e.target.value)}
                    />
                    <FormGroup style={{ display: 'flex', flexDirection: "row" }}>
                        {permissions &&
                            permissions.map(permission =>
                                <FormControlLabel key={permission.id} control={<Checkbox />} value={permission.id} label={permission.name} onChange={e => console.log(e.target.value)} />
                            )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={HandleStorePermission}>Salvar</Button>
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
        </DashboardLayout>
    )
}

export default Permissions;
