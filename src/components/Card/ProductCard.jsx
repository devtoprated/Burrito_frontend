
import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
  Box,
  useTheme
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const options = [
  "black olives", "rice", "sour cream"
];

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.categories[0].size);
  const [price, setPrice] = useState(product.categories[0].price);
  const [selectedOption, setSelectedOption] = useState(null);

  const theme = useTheme();
  const { addToCart } = useCart();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    const selectedCategory = product.categories.find(category => category.size === newSize);
    setPrice(selectedCategory.price);
  };

  const handleOption = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  };

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      size: selectedSize,
      price,
      quantity,
      options: selectedOption
    };
    addToCart(item);
    setQuantity(1);
    setSelectedSize(product.categories[0].size);
    setPrice(product.categories[0].price);
    setSelectedOption(null);
  };

  return (
    <Card sx={{ width: 380, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
          {product.name}
        </Typography>
        <RadioGroup value={selectedSize} onChange={handleSizeChange}>
          {product.categories.map((category) => (
            <FormControlLabel
              key={category.id}
              value={category.size}
              control={<Radio />}
              label={`${category.size} - $${category.price}`}
            />
          ))}
        </RadioGroup>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Price: ${price}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Options
        </Typography>
        <RadioGroup value={selectedOption} onChange={handleOption}>
          {options.map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={<Radio />}
              label={opt}
            />
          ))}
        </RadioGroup>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <IconButton onClick={handleDecrease} color="primary" sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <Remove />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 2 }}>
            {quantity}
          </Typography>
          <IconButton onClick={handleIncrease} color="primary" sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <Add />
          </IconButton>
        </Box>
      </CardContent>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
