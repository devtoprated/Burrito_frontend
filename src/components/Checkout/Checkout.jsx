import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Box,
    Divider,
    Button,
    Paper,
    IconButton
} from '@mui/material';
import { ArrowBack, Delete, Remove, Add } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../Constant/constant';
import { AuthContext } from '../../main';
import CheckoutModal from '../Model/CheckoutModel';

const CheckoutPage = () => {
    const { cart, removeFromCart, decreaseQuantity, increaseQuantity, setCart } = useCart();
    const [cartItems, setCartItems] = useState(cart);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState()
    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const handleRemoveItem = (id) => {
        removeFromCart(id); // Remove item from context
    };

    const handleDecreaseQuantity = (id) => {
        decreaseQuantity(id); // Decrease quantity in context
    };

    const handleIncreaseQuantity = (id) => {
        increaseQuantity(id); // Increase quantity in context
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleBack = () => {
        navigate('/');
    };
    const handlePlaceOrder = async () => {
        if (isLoggedIn) {
            const { data } = await axios.post(`${url}/orders`, cart, {
                headers: {
                    authorization: `Bearer ${isLoggedIn}`
                }
            });

            if (data.status) {
                setIsModalOpen(true)
                setMessageType("success")
                setMessage("Order placed successfully")
                setTimeout(() => {
                    setIsModalOpen(false)
                    setMessage("")
                    setMessageType("")
                    // navigate("/")
                    navigate("/orders")
                }, 2000)
            } else {
                setIsModalOpen(true)
                setMessageType("error")
                setMessage("Failed to place order")
                setTimeout(() => {
                    setIsModalOpen(false)
                    setMessage("")
                    setMessageType("")
                }, 2000)
            }
        } else {

            navigate("/login")
        }
    };

    return (
        <div style={{ padding: '40px' }}>
            <CheckoutModal isModalOpen={isModalOpen} message={message} messageType={messageType} />
            <Button
                startIcon={<ArrowBack />}
                onClick={handleBack}
                variant="outlined"
                sx={{ mb: 2 }}
            >
                Back
            </Button>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Checkout
                </Typography>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    {cartItems.map((item) => (
                        <Card key={item.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Size: {item.size}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" align="right">
                                            ${item.price * item.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} sx={{ textAlign: 'right' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <IconButton color="primary" onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                                                <Remove />
                                            </IconButton>
                                            <Typography variant="body1" sx={{ mx: 1 }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton color="primary" onClick={() => handleIncreaseQuantity(item.id)}>
                                                <Add />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleRemoveItem(item.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">${calculateTotal()}</Typography>
                    </Box>
                    {
                        cart.length ? 0 ?? (
                            <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
                                Proceed to Place orders
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" fullWidth onClick={handleBack}>
                                Add Items
                            </Button>
                        )
                    }

                </Paper>
            </Container>
        </div>
    );
};

export default CheckoutPage;
