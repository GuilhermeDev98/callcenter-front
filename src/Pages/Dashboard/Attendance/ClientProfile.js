import React, {useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import Api from '../../../Services/Api';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const ClientProfile = ({client}) => {

    const [Client, SetClient] = useState(client)

    console.log(client)

    return (
        <Box>
            {Client && <Grid container spacing={2}>
                <Grid item xs={8}>
                    <h1>Cliente</h1>
                    <TextField label="ID" value={Client.registration} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                    <TextField label="Nome Completo" value={Client.full_name} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="Nome Do Pai" value={Client.full_father_name} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Nome Da Mãe" value={Client.full_mother_name} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="CPF" value={Client.cpf} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="RG" value={Client.rg} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                    </Grid>
                    <h1>Endereço</h1>
                    <TextField label="Logradouro" value={Client.address} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="Número" value={Client.number_of_house} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Bairro" value={Client.district} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField label="Cidade" value={Client.city} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Estado" value={Client.state} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="CEP" value={Client.cep} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                    </Grid>
                    <h1>Contato</h1>
                    <TextField label="Email" value={Client.user.email} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="Telefone 1" value={Client.contact_phone_1} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Nome Contato" value={Client.contact_name_1} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Telefone 2" value={Client.contact_phone_2} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Nome Contato" value={Client.contact_name_2} variant="standard" fullWidth disabled size="small" sx={{ marginBottom: '5px' }} />
                        </Grid>
                    </Grid>
                    <h1>Informações Auxiliares</h1>
                    <TextField value={Client.auxiliary_information} variant="standard" fullWidth disabled multiline size="small" sx={{ marginBottom: '5px' }} />
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <img
                        src={Client.profile_photo}
                        style={{ width: '200px', height: '200px', borderRadius: '5%' }}
                    />
                    <List dense>
                        <Demo sx={{marginBottom: '1%'}}>
                            {Client.documents.map((document => (
                                <ListItem
                                secondaryAction={
                                    <a href={document.url} download target="_blank">
                                        <IconButton edge="end" aria-label="delete">
                                        <DownloadIcon  />
                                    </IconButton>
                                    </a>
                                }
                            >
                                
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AttachFileIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                
                                <ListItemText
                                    primary={document.name}
                                />
                            </ListItem>
                            )))}
                        </Demo>
                    </List>

                </Grid>
            </Grid> }
        </Box>
    )
}

export default ClientProfile