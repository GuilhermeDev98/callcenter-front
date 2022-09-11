import React, { useState } from 'react'
import Api from '../../Services/Api';
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';


import logo from './img/logo.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Livre Sistemas
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Login = ({ location }) => {

  let navigate = useNavigate()

  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [Loading, SetLoading] = useState(false)
  const [ErrorMessage, SetErrorMessage] = useState()

  const handleSubmit = async () => {

    SetLoading(true)
    try {
      const { data, status } = await Api.post('auth/login', { email, password })

      console.log(data.data)

      if (status === 200 && data.data.token)
        localStorage.setItem("call@token", data.data.token)
        localStorage.setItem("call@userName", data.data.user.name)
        localStorage.setItem("call@userId", data.data.user.id)
        localStorage.setItem("call@userRole", data.data.user.role.name)
        localStorage.setItem("call@userPermissions", data.data.user.role.permissions.map(e => e.name))
        localStorage.setItem("call@webphone", data.data.webphone)
        return navigate("/dashboard", { replace: true });

    } catch (err) {
      console.log(err)
      //SetErrorMessage(err)
      SetLoading(false)
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }} src={logo} />
          <Typography component="h1" variant="h5">
            SIT® 1.0
          </Typography>
          {ErrorMessage && <Alert severity="error" sx={{width: '100%'}}>{ErrorMessage}</Alert>}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Login"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => SetEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => SetPassword(e.target.value)}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar?"
            />
            <LoadingButton
              loading={Loading}
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a Senha?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  )
}

export default Login
