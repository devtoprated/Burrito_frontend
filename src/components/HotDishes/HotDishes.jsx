import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

const ActionsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 2,
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
    },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
}));
const HotDishes = ({ product, onAddToCart, onViewDetails }) => {
    const getImageUrl = (name) => {
        switch (name) {
            case 'Veg Burrito':
                return 'https://images.pexels.com/photos/14979836/pexels-photo-14979836/free-photo-of-burrito-in-close-up-photography.jpeg?auto=compress&cs=tinysrgb&w=600';
            case 'Chicken Burrito':
                return 'https://images.pexels.com/photos/5848040/pexels-photo-5848040.jpeg?auto=compress&cs=tinysrgb&w=600';
            default:
                return 'https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_1280.jpg';
        }
    };
    return (
        <StyledCard>
            <CardMedia
                component="img"
                image={getImageUrl(product.name)}
                alt={product.name}
                sx={{ width: { xs: '100%', sm: 350 }, minHeight: 245, maxHeight: 245, objectFit: 'cover' }}
            />
            <CardContentStyled>
                <Typography variant="h6" component="div" gutterBottom>
                    {product.name}
                </Typography>
                {product.categories.map((category) => (
                    <Box key={category.id} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Size: {category.size} - Price: ${category.price}
                        </Typography>
                    </Box>
                ))}
                <ActionsBox>
                    <IconButton
                        color="primary"
                        onClick={() => onAddToCart(product)}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => onViewDetails(product)}
                    >
                        <InfoIcon />
                    </IconButton>
                </ActionsBox>
            </CardContentStyled>
        </StyledCard>
    );
};

export default HotDishes;
