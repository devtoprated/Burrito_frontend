import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { url } from '../../Constant/constant';

import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../Model/CheckoutModel';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import NavigationBar from '../Navbars/NavigationBar/NavigationBar';


const OrderList = () => {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState()
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchOrder = async (token) => {
            try {
                const { data } = await axios.get(`${url}/orders`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log(data.status);
                setOrder(data.result);
            }
            catch (err) {
                setIsModalOpen(true)
                setMessageType("error")
                setMessage(err.message)
                setTimeout(() => {
                    setIsModalOpen(false)
                    setMessage("")
                    setMessageType("")
                    navigate("/login")
                }, 2000)
            }
        };


        console.log("tokentokentoken", token)
        if (token) {
            setIsLoggedIn(token)
        }

        fetchOrder(token);
    }, []);
    const handleBack = () => {
        navigate("/")
    }
    return (
        <>
            <CheckoutModal isModalOpen={isModalOpen} message={message} messageType={messageType} />
<Box sx={{mt:5}}>
<NavigationBar/>
</Box>
            {
                order ? (

                    <>
                        <div style={{ padding: "30px", marginTop:"40px" }}>
                            <Button
                                startIcon={<ArrowBack />}
                                onClick={handleBack}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            >
                                Back
                            </Button>
                            <Container sx={{ py: 4 }}>
                                <Typography variant="h4" gutterBottom align="center">
                                    Order List
                                </Typography>
                                <Grid container spacing={4}>
                                    {order.map((order) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
                                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        Order ID: {order.id}
                                                    </Typography>

                                                </CardContent>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <List>
                                                        {order.orderItems.map((item) => (
                                                            <React.Fragment key={item.id}>
                                                                <ListItem alignItems="flex-start">
                                                                    <Grid container spacing={2} alignItems="center">
                                                                        <Grid item xs={4} sm={3}>
                                                                            <CardMedia
                                                                                component="img"
                                                                                image={"https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_1280.jpg"}
                                                                                alt={item.burrito.name}
                                                                                sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={8} sm={9}>
                                                                            <ListItemText
                                                                                primary={item.burrito.name}
                                                                                secondary={`Quantity: ${item.quantity}`}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </ListItem>
                                                                <Divider />
                                                            </React.Fragment>
                                                        ))}
                                                    </List>
                                                </Box>
                                                <Box sx={{ padding: 2 }}>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Total Cost: ${order.totalCost}
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        order place date: {new Date(order.createdAt).toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
                        </div>
                    </>
                ) : (
                    <Typography variant="subtitle1">No Order Found</Typography>
                )
            }
        </>
    )
}

export default OrderList
