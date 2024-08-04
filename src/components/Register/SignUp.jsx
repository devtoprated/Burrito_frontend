import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Avatar, Alert } from '@mui/material';
import { url } from '../../Constant/constant';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate()
  const [error, setError] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password is not matched")

      setTimeout(() => {
        setError("")
      }, 2000)
      return;
    }

    const { data } = await axios.post(`${url}/users/register`, formData);

    if (data.status) {
      navigate('/login')
    }

    else {
      setError(data.message)
      setTimeout(() => {
        setError("")
      }, 2000)
    }

  };

  return (
    <Container maxWidth="sm">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
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
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        {
          error && (

            <Alert style={{ padding: "5px 0px" }} severity="error">{error}</Alert>

          )
        }
        <Box sx={{ mt: 3, mb: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Box>
        <Link style={{ float: 'right' }} to='/login'>Login</Link>
      </form>
    </Container>
  );
};

export default SignUp;
