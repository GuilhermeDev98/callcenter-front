import React, { useState, useEffect } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import GroupIcon from "@mui/icons-material/Group";
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';






const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Teams = () => {

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


    const [Supervisors, SetSupervisors] = useState([])
    const [Team, SetTeam] = useState()
    const [ModalAddEmployeeInTeam, SetModalAddEmployeeInTeam] = useState(false)
    const [Employees, SetEmployees] = useState([])
    const [TeamUsers, SetTeamUsers] = useState(([]))
    const [RoleSupervisor, SetRoleSupervisor] = useState([])
    const [TeamEdit, SetTeamEdit] = useState([])

    const GetAllRoles = (pageToGo = 1) => {
        SetLoading(true)
        try {
            Api.get(`teams?page=${pageToGo}`).then(({ data }) => {
                SetRoles(data.data)
                SetLoading(false)
                SetPaginate(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const GetAllEmployees = () => {
        SetLoading(true)
        try {
            Api.get(`employees`).then(({ data }) => {
                SetEmployees(data.data)
                SetLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const GetAllSupervisors = () => {
        try {
            Api.get(`employees`).then(({ data }) => {
                SetSupervisors(data.data)
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
         try{
            Api.post('teams', Team).then(({ data }) => {
                GetAllRoles()
                SetRoleModalOpen(false)
                SetAlert({ open: true, message: 'Time Cadastrado Com Sucesso !', status: 'success' })
            }).catch((error) => {
                SetAlert({ open: true, message: 'Erro Ao Cadastrar Time !', status: 'error' })
                console.log(error.context)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickOpen = () => SetRoleModalOpen(true)
    const handleClose = () => SetRoleModalOpen(false)


    const HandleEditRole = row => {
        SetTeamEdit({
            name: row.name,
            supervisor_name: row.supervisor.name,
            supervisor_id: row.supervisor.id
        })
        SetRowSelected(row)
        SetRoleName(row.name)
        SetModalEditRowStatus(true)
        GetAllEmployees()
    }

    const HandleDeleteRow = ({ id }) => {
        try {
            Api.delete(`teams/${id}`).then(r => {
                GetAllRoles()
                SetModalEditRowStatus(false)
                SetAlert({ open: true, message: 'Setor Deletado Com Sucesso !', status: 'success' })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const EditRole = () => {
        try {
            Api.put(`teams/${RowSelected.id}`, TeamEdit).then(r => {
                GetAllRoles()
                SetModalEditRowStatus(false)
                SetAlert({ open: true, message: 'Setor Atualizado Com Sucesso !', status: 'success' })
            }).catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    const HandleToogleUser = (user) => {
        const newsPerm = Employees.map((employee) => {
            if (employee.name == user) {
                return { ...employee, selected: !employee.selected }
            } else {
                return employee
            }
        })
        SetEmployees(newsPerm)
    }
    const HandleEditEmployeesOfTeam = () => {
        const EmployeesSelecteds = Employees.filter(employee => employee.selected === true)
        const EmployeesId = EmployeesSelecteds.map(e => e.id)
        try {
            Api.patch(`/teams/${TeamUsers.id}/employees`, {"employees": EmployeesId}).then(r => {
                GetAllRoles()
                SetModalAddEmployeeInTeam(false)
                SetAlert({ open: true, message: "Editado Com Sucesso", status: 'success'})
            }).catch(e => SetAlert({ open: true, message: e.message, status: 'error'}))
        }catch (e) {
            SetAlert({ open: true, message: e.message, status: 'error'})
        }
    }

    useEffect(() => {
        GetAllRoles()
        GetAllPermissions()
        GetAllSupervisors()
        GetAllEmployees()
        SetTeamUsers([])
    }, [])


    useEffect(() => {
        const mapa = Employees.map(employee => {
            if (TeamUsers.employees.find(user => user.name == employee.name)) {
                return { ...employee, selected: true }
            } else {
                return { ...employee, selected: false }
            }
        })

        SetEmployees(mapa)
    }, [ModalAddEmployeeInTeam])

    return (
        <div>
            <TableWrapper
                tableTitle="Times"
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
                                <TableCell align="center">Supervisor</TableCell>
                                <TableCell align="center">Funcionários</TableCell>
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
                                        {row.supervisor.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip label={row.employees.length} />
                                    </TableCell>
                                    <TableCell align="right" >
                                        <IconButton onClick={() => {
                                            SetModalAddEmployeeInTeam(true)
                                            SetTeamUsers(row)
                                        }}>
                                            <GroupIcon />
                                        </IconButton>
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
                <DialogTitle>Novo Time</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => SetTeam({...Team, "name": e.target.value})}
                    />
                    <FormControl fullWidth variant="standard" size="small">
                        <InputLabel>Responsável</InputLabel>
                        <Select
                            value={Team && Team.supervisor_id}
                            label="Setor"
                            required
                            onChange={(e) => SetTeam({...Team, "supervisor_name": e.target.value.name, "supervisor_id": e.target.value.id})}
                        >
                            {Supervisors && Supervisors.map(supervisor => <MenuItem key={supervisor.id} value={supervisor}>{supervisor.name}</MenuItem>)}
                        </Select>
                    </FormControl>
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
                        value={TeamEdit && TeamEdit.name}
                        fullWidth
                        variant="standard"
                        onChange={(e) => SetTeamEdit({...TeamEdit, name: e.target.value})}
                    />
                    <FormControl fullWidth variant="standard" size="small">
                        <InputLabel>Responsável</InputLabel>
                        <Select
                            defaultValue={TeamEdit && TeamEdit.supervisor_id}
                            required
                            onChange={(e, c) => SetTeamEdit({...TeamEdit, supervisor_id: c.props.value, supervisor_name: c.props.children})}
                        >
                            {Supervisors && Supervisors.map(supervisor => <MenuItem key={supervisor.id} value={supervisor.id}>{supervisor.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => SetModalEditRowStatus(false)}>Fechar</Button>
                    <Button onClick={() => EditRole()}>Salvar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={ModalAddEmployeeInTeam} onClose={() => SetModalAddEmployeeInTeam(false)}>
                <DialogTitle>Funcinários</DialogTitle>
                <DialogContent>
                    <FormGroup style={{ display: 'flex', flexDirection: "row" }}>
                        {Employees &&
                            Employees.map(employee =>

                                <FormControlLabel key={employee.id} control={<Switch size="small"  checked={employee.selected ? employee.selected : false} />} value={employee.id} label={`${employee.id} - ${employee.name}`} onChange={() => HandleToogleUser(employee.name)} />
                            )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => SetModalAddEmployeeInTeam(false)}>Fechar</Button>
                    <Button onClick={() => HandleEditEmployeesOfTeam()}>Salvar</Button>
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

export default Teams;
