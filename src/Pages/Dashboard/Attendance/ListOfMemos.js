import React, {useState, useEffect} from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { TableFooter } from '@mui/material';
import { Box } from '@mui/system';
import Api from '../../../Services/Api';

const ListOfMemos = ({client}) => {

    const [Logs, SetLogs] = useState()

    const GetLogs = async () => {
        try {
            const {data} = await Api.get(`clients/${client.registration}/logs`)
            SetLogs(data.logs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetLogs()
    }, [])

    return (
        <Box>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Informação</TableCell>
                                <TableCell align="center">Data</TableCell>
                                <TableCell align="center">Hora</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Logs && Logs.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="center">{row.created_at.split(' ')[0]}</TableCell>
                                    <TableCell align="center">{row.created_at.split(' ')[1]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Pagination count={10} sx={{ marginTop: '2%' }} />
                </Stack>
        </Box>

    )
}

export default ListOfMemos