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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Roles = () => {

    const [roles, SetRoles] = useState([])
    const [permissions, SetPermissions] = useState([])
    const [roleModalOpen, SetRoleModalOpen] = useState(false)
    const [permission, SetPermission] = useState('')
    const [alert, SetAlert] = useState({ open: false, message: '', status: 'success' })
    const [loading, SetLoading] = useState(true)
    const [Paginate, SetPaginate] = useState([])
    const [PermissionsSelecteds, SetPermissionsSelecteds] = useState([])
    const [PermissionsSelectedsToEdit, SetPermissionsSelectedsToEdit] = useState([])
    const [RowSelected, SetRowSelected] = useState()
    //const [RowSelected, SetRowSelected] = useState({ id: 1, name: "N1", created_at: "2022-07-09T18:11:05.000000Z", updated_at: "2022-07-15T03:57:17.000000Z", permissions: [{ id: 1, name: "/dashboard", created_at: "2022-07-12T22:47:44.000000Z", updated_at: "2022-07-12T22:47:44.000000Z", pivot: { role_id: 1, permission_id: 1 } }, { id: 2, name: "/dashboard/permissions", created_at: "2022-07-12T22:47:44.000000Z", updated_at: "2022-07-12T22:47:44.000000Z", pivot: { role_id: 1, permission_id: 2 } }] })
    const [ModalEditRowStatus, SetModalEditRowStatus] = useState(false)
    const [RoleName, SetRoleName] = useState('')

    const GetAllRoles = (pageToGo = 1) => {
        SetLoading(true)
        try {
            Api.get(`roles?page=${pageToGo}`).then(({ data }) => {
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
        console.log({ "name": permission, "permissions": PermissionsSelecteds })
        try {
            Api.post('roles', { "name": permission, "permissions": PermissionsSelecteds }).then(({ data }) => {
                GetAllRoles()
                SetRoleModalOpen(false)
                SetAlert({ open: true, message: 'Setor Cadastrado Com Sucesso !', status: 'success' })
            }).catch((error) => {
                SetAlert({ open: true, message: 'Erro Ao Cadastrar Setor !', status: 'error' })
                console.log(error.context)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickOpen = () => SetRoleModalOpen(true)
    const handleClose = () => SetRoleModalOpen(false)

    const HandlePermissionSelect = (e) => {
        //Verifica se a permissão já foi adicionada
        const hasInserted = PermissionsSelecteds.includes(e.target.value)

        if (hasInserted) {
            //função para remover permissão do array
            var filtered = PermissionsSelecteds.filter(function (value, index, arr) {
                return value != e.target.value;
            });
            SetPermissionsSelecteds(filtered)
        } else {
            //função para inserir permissão no array
            SetPermissionsSelecteds([...PermissionsSelecteds, e.target.value])
        }
    }

    const HandleShowTooltipPermisions = index => {
        if (roles[index].permissions < 1) {
            return 'Nenhuma Permissão Cadastrada'
        } {
            return roles[index].permissions.map(({ name }) => `${name}, `)
        }

    }

    const HandleEditRole = row => {
        SetRowSelected(row)
        SetRoleName(row.name)
        SetModalEditRowStatus(true)
        SetPermissionsSelectedsToEdit(row.permissions.map(element => element.id))
    }

    const HandleDeleteRow = ({ id }) => {
        try {
            Api.delete(`roles/${id}`).then(r => {
                GetAllRoles()
                SetModalEditRowStatus(false)
                SetAlert({ open: true, message: 'Setor Deletado Com Sucesso !', status: 'success' })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const EditRole = () => {
        console.log(PermissionsSelecteds)
        try {
            Api.put(`roles/${RowSelected.id}`, { name: RoleName, permissions: PermissionsSelecteds }).then(r => {
                GetAllRoles()
                SetModalEditRowStatus(false)
            }).catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetAllRoles()
        GetAllPermissions()
    }, [])

    return (
        <DashboardLayout>
            <TableWrapper
                tableTitle="Setores"
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
                                <TableCell align="center">Permissões</TableCell>
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
                                    <TableCell align="center">
                                        <Tooltip title={HandleShowTooltipPermisions(index)}>
                                            <Chip label={row.permissions.length} />
                                        </Tooltip>
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
                    <Pagination sx={{ margin: '0 auto' }} page={Paginate.current_page} count={Math.ceil(Paginate.total / Paginate.per_page)} onChange={(e, page) => GetAllRoles(page)} />
                </Stack>
            </TableWrapper>

            <Dialog open={roleModalOpen} onClose={handleClose}>
                <DialogTitle>Novo Setor</DialogTitle>
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
                    <h4>Permissões</h4>
                    <FormGroup style={{ display: 'flex', flexDirection: "row" }}>
                        {permissions &&
                            permissions.map(permission =>
                                <FormControlLabel key={permission.id} control={<Checkbox />} value={permission.id} label={permission.name} onChange={HandlePermissionSelect} />
                            )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={HandleStorePermission}>Salvar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={ModalEditRowStatus} onClose={() => SetModalEditRowStatus(false)}>
                <DialogTitle>Editar Setor</DialogTitle>
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
                    <FormGroup style={{ display: 'flex', flexDirection: "row" }}>
                        {permissions &&
                            permissions.map(permission =>
                                <FormControlLabel key={permission.id} control={<Checkbox />} value={permission.id} label={`${permission.name} ${PermissionsSelectedsToEdit.includes(permission.id) ? 'S': ''}`} onChange={HandlePermissionSelect} />
                            )}
                    </FormGroup>
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
        </DashboardLayout>
    )
}

export default Roles;
