import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Api from '../../../Services/Api'
import TableWrapper from '../../../Components/Table';

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
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Permissions = () => {

    const [roles, SetRoles] = useState([])
    const [roleModalOpen, SetRoleModalOpen] = useState(false)
    const [permission, SetPermission] = useState('')
    const [alert, SetAlert] = useState({ open: false, message: '', status: 'success' })
    const [loading, SetLoading] = useState(true)
    const [Paginate, SetPaginate] = useState([])
    const [RowSelected, SetRowSelected] = useState([])
    //const [RowSelected, SetRowSelected] = useState({ id: 1, name: "N1", created_at: "2022-07-09T18:11:05.000000Z", updated_at: "2022-07-15T03:57:17.000000Z", permissions: [{ id: 1, name: "/dashboard", created_at: "2022-07-12T22:47:44.000000Z", updated_at: "2022-07-12T22:47:44.000000Z", pivot: { role_id: 1, permission_id: 1 } }, { id: 2, name: "/dashboard/permissions", created_at: "2022-07-12T22:47:44.000000Z", updated_at: "2022-07-12T22:47:44.000000Z", pivot: { role_id: 1, permission_id: 2 } }] })
    const [ModalEditRowStatus, SetModalEditRowStatus] = useState(false)
    const [RoleName, SetRoleName] = useState('')

    const GetAllPermissions = (pageToGo = 1) => {
        SetLoading(true)
        try {
            Api.get(`permissions?page=${pageToGo}`).then(({ data }) => {
                SetRoles(data.data)
                SetLoading(false)
                SetPaginate(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const HandleStorePermission = async () => {
        try {
            Api.post('permissions', { "name": permission}).then(({ data }) => {
                GetAllPermissions()
                SetRoleModalOpen(false)
                SetAlert({ open: true, message: 'Permissão Cadastrada Com Sucesso !', status: 'success' })
            }).catch((error) => {
                SetAlert({ open: true, message: 'Erro Ao Cadastrar Permissão !', status: 'error' })
                console.log(error.context)
            })
        } catch (error) {
            console.log(error)
        }
    }



    const handleClickOpen = () => {
        SetRoleModalOpen(true);
    };

    const handleClose = () => {
        SetRoleModalOpen(false);
    };

    const HandleEditRole = row => {
        SetRowSelected(row)
        SetRoleName(row.name)
        SetModalEditRowStatus(true)
    }

    const HandleDeleteRow = ({ id }) => {
        try {
            Api.delete(`permissions/${id}`).then(r => {
                GetAllPermissions()
                SetModalEditRowStatus(false)
                SetAlert({ open: true, message: 'Permissão Deletada Com Sucesso !', status: 'success' })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const EditRole = () => {
        try {
            Api.put(`permissions/${RowSelected.id}`, { name: RoleName }).then(r => {
                GetAllPermissions()
                SetModalEditRowStatus(false)
            }).catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetAllPermissions()
    }, [])

    return (
        <div>
            <TableWrapper
                tableTitle="Permissões"
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
                            {roles && roles.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right" >
                                        <IconButton onClick={() => HandleEditRole(row)}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton onClick={() => HandleDeleteRow(row)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} sx={{ marginTop: '1%' }}>
                    <Pagination sx={{ margin: '0 auto' }} page={Paginate.current_page} count={Math.ceil(Paginate.total / Paginate.per_page)} onChange={(e, page) => GetAllPermissions(page)} />
                </Stack>
            </TableWrapper>

            <Dialog open={roleModalOpen} onClose={handleClose}>
                <DialogTitle>Nova Permissão</DialogTitle>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={HandleStorePermission}>Salvar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={ModalEditRowStatus} onClose={() => SetModalEditRowStatus(false)}>
                <DialogTitle>Editar Permissão</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome"
                        type="text"
                        value={RoleName}
                        fullWidth
                        variant="standard"
                        onChange={(e) => SetRoleName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => SetModalEditRowStatus(false)}>Fechar</Button>
                    <Button onClick={() => EditRole()}>Salvar</Button>
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

export default Permissions;
