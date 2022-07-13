import React, { useState, useEffect } from 'react'
import axios from "axios";

import DashboardLayout from '../../Layouts/DashboardLayout'

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { supabase } from '../../../Services/Supabase';
import Api from '../../../Services/Api';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const Input = styled('input')({
    display: 'none',
});


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Client = ({ url }) => {

    const [alert, SetAlert] = useState({open: false, message: '', status: 'success'})

    const [Client, SetCliente] = useState({
        profile_photo: 'https://gmeskrhufwevxxabunis.supabase.co/storage/v1/object/public/profile/patient.png',
        address: '',
        district: '',
        city: '',
        state: '',
    })

    const [Documents, SetDocuments] = useState([])

    const HandleCreateCliente = async () => {
        console.log(Client)
        try {
            await Api.post('clients', Client)
            SetCliente({
                profile_photo: 'https://gmeskrhufwevxxabunis.supabase.co/storage/v1/object/public/profile/patient.png',
                address: '',
                district: '',
                city: '',
                state: '',
            })

            SetAlert({open: true, message: 'Cliente Cadastrado Com Sucesso', status: 'success'})
        } catch (error) {
            console.log(error)
        }
    }

    const HandleSearchCEP = async (e) => {
        if (e.target.value.length == 8) {
            const url = `https://viacep.com.br/ws/${e.target.value}/json`
            const { data, status } = await axios.get(url)
            if (status == 200) {
                SetCliente({
                    ...Client,
                    cep: data.cep,
                    address: data.logradouro,
                    district: data.bairro,
                    city: data.localidade,
                    state: data.uf,

                })
            }
        }
    }

    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('profile').download(path)
            console.log(data)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            SetCliente({ ...Client, profile_photo: url })
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    const uploadAvatar = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('Imagem Não Selecionada')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError } = await supabase.storage.from('profile').upload(filePath, file)
            const { publicURL } = await supabase.storage.from('profile').getPublicUrl(filePath)

            if (uploadError) {
                throw uploadError
            }

            onUpload(publicURL)
        } catch (error) {
            alert(error.message)
            setUploading(false)
        }
    }

    const onUpload = (url) => {
        SetCliente({ ...Client, profile_photo: url })
    }

    const removeDocument = indexToRemove => {
        const removeIndex = Documents.filter((doc, index) => indexToRemove != index)
        SetDocuments(removeIndex)
    }

    const uploadDocuments = async (event) => {
        try {
            setUploading(true)
            console.log('true')


            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('Arquivos Não Selecionados')
            }

            const files = event.target.files;
            const arrayOfFiles = [...files]
            Promise.all(arrayOfFiles.map(async file => {
                const fileExt = file.name.split('.').pop()
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `${fileName}`

                let { error } = await supabase.storage.from('documents').upload(filePath, file)
                const { publicURL } = await supabase.storage.from('documents').getPublicUrl(filePath)

                if (error) {
                    throw error
                }

                return { name: file.name, url: publicURL, finalizado: true }
            })).then(r => {
                SetDocuments(r)
                setUploading(false)
            })

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <DashboardLayout>

            <Box>
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => SetAlert({open: false, message: '', status: 'success'})} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                    <Alert onClose={() => SetAlert({open: false, message: '', status: 'success'})} severity={alert.status} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h1>Cliente</h1>
                        <TextField label="Nome Completo" name="full_name" value={Client.full_name} variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Nome Do Pai" value={Client.full_father_name} name="full_father_name" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Nome Da Mãe" value={Client.full_mother_name} name="full_mother_name" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="CPF" value={Client.cpf} name="cpf" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="RG" value={Client.rg} name="rg" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                        </Grid>
                        <h1>Endereço</h1>
                        <TextField label="CEP" value={Client.cep} name="CEP" variant="standard" fullWidth onChange={HandleSearchCEP} size="small" sx={{ marginBottom: '5px' }} />
                        <TextField label="Logradouro" value={Client.address} name="address" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Número" value={Client.number_of_house} name="number_of_house" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Bairro" value={Client.district} name="district" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Cidade" value={Client.city} name="city" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Estado" value={Client.state} name="state" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                        </Grid>
                        <h1>Contato</h1>
                        <TextField label="Email" value={Client.contact_email} name="contact_email" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Telefone 1" value={Client.contact_phone_1} name="contact_phone_1" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Nome Contato" value={Client.contact_name_1} name="contact_name_1" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Telefone 2" value={Client.contact_phone_2} name="contact_phone_2" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Nome Contato" value={Client.contact_name_2} name="contact_name_2" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} size="small" sx={{ marginBottom: '5px' }} />
                            </Grid>
                        </Grid>
                        <h1>Informações Auxiliares</h1>
                        <TextField value={Client.auxiliary_information} name="auxiliary_information" variant="standard" fullWidth onChange={e => SetCliente({ ...Client, [e.target.name]: e.target.value })} multiline size="small" sx={{ marginBottom: '5px' }} />
                        <Button variant="contained" component="span" color='success' disabled={uploading} onClick={HandleCreateCliente} fullWidth sx={{ marginTop: '2%' }}>
                            Salvar
                        </Button>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                        <img
                            src={Client.profile_photo}
                            alt={avatarUrl ? 'Avatar' : 'No image'}
                            style={{ width: '200px', height: '200px', borderRadius: '5%' }}
                        />
                        <label htmlFor="contained-button-file" >
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={uploadAvatar} />

                            <Button variant="contained" component="span" size="small" fullWidth sx={{ marginBottom: '5px' }}>
                                Alterar Imagem
                            </Button>
                        </label>
                        <List dense>
                            {Documents && Documents.map((file, index) => (<Demo key={index} sx={{ marginBottom: '1%' }}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="Remover">
                                            {!file.finalizado && <CircularProgress />}
                                            {file.finalizado && <DeleteIcon sx={{ color: "red" }} onClick={() => removeDocument(index)} />}
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AttachFileIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={file.name}
                                    />
                                </ListItem>
                            </Demo>))}
                        </List>
                        <label htmlFor="add-documents" >
                            <Input accept="application/pdf" id="add-documents" multiple type="file" onChange={uploadDocuments} />

                            <Button variant="contained" component="span" size="small" fullWidth sx={{ marginBottom: '5px' }}>
                                Adicionar Documentos
                            </Button>
                        </label>
                    </Grid>
                </Grid>

            </Box>
        </DashboardLayout >
    )
}

export default Client