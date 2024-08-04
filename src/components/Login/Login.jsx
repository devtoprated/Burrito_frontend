import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { url } from '../../Constant/constant';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const navigate = useNavigate()

  const [error, setError] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${url}/auth/login`, formData)

    console.log(data)

    if (data.status) {
      localStorage.setItem('user', data.user)
      localStorage.setItem('token', data.access_token)
      navigate('/')

    }

    else {
      setError(data.message)
      setTimeout(() => {
        setError("")
      }, 2000)
    }

  };

  return (
    <>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">

          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {
                error && (
                  <Alert style={{padding:"5px 0px"}} severity="error">{error}</Alert>
                )
              }
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
              <Grid container style={{ marginTop: '30px' }}>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/register' variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
