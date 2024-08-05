import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Alert, Avatar, CssBaseline, FormControlLabel, Checkbox, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { url } from '../../Constant/constant';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import NavigationBar from '../Navbars/NavigationBar/NavigationBar';

const defaultTheme = createTheme();

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/auth/login`, formData);
      if (data.status) {
        login(data.user, data.access_token);
      } else {
        setError(data.message);
        setTimeout(() => setError(''), 2000);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
     <Box>
     <NavigationBar/>
     </Box>
     <Box sx={{marginTop:15}}>
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
            {error && (
              <Alert style={{ padding: '5px 0px' }} severity="error">{error}</Alert>
            )}
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
     </Box>
      
    </ThemeProvider>
  );
};

export default Login;

