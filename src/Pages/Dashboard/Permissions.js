import React, {useState, useEffect} from "react";
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
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const Permissions = () => {
    const [roles, SetRoles] = useState([])
    const [permissions, SetPermissions] = useState([])
    const [roleModalOpen, SetRoleModalOpen] = useState(false)

    const GetAllRoles = async () => {
        try {
            const {data} = await Api.get('roles')
            SetRoles(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetAllPermissions = async () => {
        try {
            const {data} = await Api.get('permissions')
            SetPermissions(data.data)
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

    useEffect(() => {
        GetAllRoles()
        GetAllPermissions()
    }, [])

    return (
        <DashboardLayout title="Permissões">
            <TableWrapper
                tableTitle="Permissões"
                tableOptions={
                    <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                        <Button onClick={handleClickOpen}>
                            <AddIcon />
                        </Button>
                    </ButtonGroup>
                }
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
          />
          <FormGroup style={{display: 'flex', flexDirection: "row"}}>
            {permissions &&
              permissions.map( permission =>
                <FormControlLabel key={permission.id} control={<Checkbox />} value={permission.id} label={permission.name} onChange={e => console.log(e.target.value)} />
              )}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={handleClose}>Salvar</Button>
        </DialogActions>
      </Dialog>
        </DashboardLayout>
    )
}

export default Permissions;
