import React, { useState, useEffect } from 'react'
import axios from "axios";
import * as yup from 'yup';

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
import Card from '@mui/material/Card';

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
    });

    /*const [Client, SetCliente] = useState({
        profile_photo: 'https://gmeskrhufwevxxabunis.supabase.co/storage/v1/object/public/profile/patient.png',
        address: 'Rua Governador Jorge Teixeira',
        district: 'Nova Brasília',
        city: 'Ji-Paraná',
        state: 'RO',
        full_name: 'Augusto Pietro Cauã Fogaça',
        full_father_name: 'Levi Daniel Fogaça',
        full_mother_name: 'Carolina Sophia Cecília',
        cpf: '86514351697',
        rg: '399534489',
        cep: '76908478',
        number_of_house: '1',
        contact_email: 'augusto_pietro_fogaca@sercoti.com.br',
        contact_phone_1: '69991511732',
        contact_name_1: 'Augusto',
        documents: [
            {
                name: 'Arquivo 1',
                url: 'https://gmeskrhufwevxxabunis.supabase.co/storage/v1/object/public/documents/0.0005665969755268563.pdf',
                finalizado: true,
                created_by: 2
            },
            {
                name: 'Arquivo 2',
                url: 'https://gmeskrhufwevxxabunis.supabase.co/storage/v1/object/public/documents/0.0005665969755268563.pdf',
                finalizado: true,
                created_by: 2
            }
        ]
    })*/

    

    const [Documents, SetDocuments] = useState([])

    const HandleCreateCliente = async () => {
        try {
            ValidateUser(Client)
        } catch (error) {
            console.log(error)
        }
    }

    const HandleSearchCEP = async (e) => {
        console.log(e.target.value)
        if (e.target.value.length == 8) {
            const url = `https://viacep.com.br/ws/${e.target.value}/json`
            const { data, status } = await axios.get(url)
            if (status == 200) {
                SetCliente({
                    ...Client,
                    cep: data.cep.replace('-', ''),
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

                return { name: file.name, url: publicURL, finalizado: true, created_by: localStorage.getItem('call@userId') }
            })).then(r => {
                SetDocuments(r)
                setUploading(false)
            })

        } catch (error) {
            alert(error.message)
        }
    }

    const ValidateUser = (user) => {
        if(Documents.length >= 1){
            user.documents = Documents
        }

        let schema = yup.object().shape({
            full_name: yup.string('Campo Nome Completo Inválido').required('Campo Nome Completo é Obrigatório'),
            full_father_name: yup.string('Campo Nome do Pai Inválido').required('Campo Nome do Pai é Obrigatório'),
            full_mother_name: yup.string('Campo Nome da Mãe Inválido').required('Campo Nome da Mãe é Obrigatório'),
            cpf: yup.number('Campo CPF Inválido').positive('Campo CPF Inválido').required('Campo CPF é Obrigatório'),
            rg: yup.number('Campo RG Inválido').positive('Campo CPF Inválido').required('Campo RG é Obrigatório'),
            profile_photo: yup.string('Campo Foto do Cliente Inválido').url().required('Campo Foto do Cliente é Obrigatória'),
            cep: yup.number('Campo CEP Inválido').positive('Campo CPF Inválido').required('Campo CEP é Obrigatório'),
            address: yup.string('Campo Endereço Inválido').required('Campo Endereço é Obrigatório'),
            district: yup.string('Campo Bairro Inválido').required('Campo Bairro é Obrigatório'),
            city: yup.string('Campo Cidade Inválido').required('Campo Cidade é Obrigatório'),
            state: yup.string('Campo Estado Inválido').required('Campo Estado é Obrigatório'),
            number_of_house: yup.number('Campo Número da Casa Inválido').positive('Campo Número da Casa Inválido').required('Campo Número da Casa é Obrigatório'),
            contact_email: yup.string('Campo E-Mail de Contato Inválido').email().required('Campo E-Mail de Contato é Obrigatório'),
            contact_phone_1: yup.number('Campo Telefone de Contato 1 Inválido').positive('Campo Telefone de Contato 1 Inválido').required('Campo Telefone de Contato 1 é Obrigatório'),
            contact_name_1: yup.string('Campo Nome de Contato 1 Inválido').required('Campo Nome de Contato 1 é Obrigatório'),
            contact_phone_2: yup.number('Campo Telefone de Contato 2 Inválido').positive('Campo Telefone de Contato 2 Inválido'),
            contact_name_2: yup.string('Campo Nome de Contato 2 Inválido'),
            auxiliary_information: yup.string('Campo Informações Auxiliares Inválido'),
          });


          schema.validate(user, {'abortEarly': false})
            .then(() => {
                Api.post('clients', user).then(() => {
                    SetCliente({
                        profile_photo: 'https://gmeskrhufwevxxabunis.supabase.co/storage/v1/object/public/profile/patient.png',
                        full_name: '',
                        full_father_name: '',
                        full_mother_name: '',
                        cpf: '',
                        rg: '',
                        profile_photo: '',
                        cep: '',
                        address: '',
                        district: '',
                        city: '',
                        state: '',
                        number_of_house: '',
                        contact_email: '',
                        contact_phone_1: '',
                        contact_name_1: '',
                        contact_phone_2: '',
                        contact_name_2: '',
                        auxiliary_information: '',
                    })
                    SetAlert({open: true, message: 'Cliente Cadastrado Com Sucesso', status: 'success'})
                    SetDocuments([])
                }).catch(err => {
                    console.log(err)
                });
                
            }).catch(err => {
                console.log(err)
                SetAlert({open: true, message: err.errors[0], status: 'error'})
            });
    }

    return (
        <DashboardLayout>

            <Box>
                <Card sx={{padding: '2%'}}>
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
                </Card>
            </Box>
        </DashboardLayout >
    )
}

export default Client