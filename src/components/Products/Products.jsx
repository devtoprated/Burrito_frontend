import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Menu, MenuItem, Grid, useTheme, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../context/CartContext';
import NavigationBar from '../Navbars/NavigationBar/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
const options = [
   "black olives", "rice", "sour cream"
];
const ProductCard = ({ products }) => {
   const { addToCart } = useCart();
   const navigate = useNavigate()
   const theme = useTheme();
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const handleNav = () => {
      navigate("/checkout")
   }
   const handleBack=()=>{
      navigate("/")
   }
     
   return (
      <><NavigationBar />
      <Button
                     startIcon={<ArrowBack />}
                     onClick={handleBack}
                     variant="outlined"
                     sx={{ mb: 3, mt: 7, ml:2 }}
                  >
                     Back
                  </Button>
         <Box>
            <Typography variant="h6" component="div" gutterBottom style={{ textAlign: "center" }} sx={{ mt: 12 }}>
               Choose Items
            </Typography>
         </Box>
         <Grid container spacing={3} justifyContent="center">


            {products.map((product) => {
               const [anchorEl, setAnchorEl] = useState(null);
               const [anchorElOptions, setAnchorElOptions] = useState(null);
               const [selectedOptions, setSelectedOptions] = useState(null);
               const [selectedCategory, setSelectedCategory] = useState(null);
               const openOptions = Boolean(anchorElOptions);
               const open = Boolean(anchorEl);

               const handleClick = (event) => {
                  setAnchorEl(event.currentTarget);
               };
               const handleClickOptions = (event) => {
                  setAnchorElOptions(event.currentTarget);
               };

               const handleClose = () => {
                  setAnchorEl(null);
               };
               const handleCloseOptions = () => {
                  setAnchorElOptions(null);
               };

               const handleSelectCategory = (category) => {
                  setSelectedCategory(category);
                  handleClose();
               };
               const handleSelectOptions = (category) => {
                  setSelectedOptions(category);
                  handleCloseOptions();
               };
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
               const handleAddToCart = () => {
                  console.log("selectedCategoryselectedCategory", selectedCategory)
                  if (selectedCategory == null) {
                     alert("Please choose dish size")
                  }
                  const item = {
                     id: product.id,
                     name: product.name,
                     size: selectedCategory.size,
                     price: selectedCategory.price,
                     quantity: 1,
                     image: getImageUrl(product.name),
                     options: selectedOptions
                  };

                  if (selectedCategory) {
                     const message = addToCart(item);
                     if (message != "") {
                        alert(message)
                     }
                                       } 
               };

               return (
                  <>
                  <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', margin: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                           <CardMedia
                              component="img"
                              image={getImageUrl(product.name)}
                              alt={product.name}
                              sx={{ width: '100%', height: 140, objectFit: 'cover' }} />
                           <CardContent>
                              <Typography variant="h6" component="div" gutterBottom style={{ textAlign: "center" }}>
                                 {product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                 {selectedCategory ? `Size: ${selectedCategory.size} - Price: $${selectedCategory.price}` : 'Please select a category'}
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                 <Button
                                    variant="outlined"
                                    onClick={handleClick}
                                    sx={{ width: "200px" }}
                                 >
                                    Select Category
                                 </Button>

                              </Box>
                              <Menu
                                 anchorEl={anchorEl}
                                 open={open}
                                 onClose={handleClose}
                              >
                                 {product.categories.map((category) => (
                                    <MenuItem key={category.id} onClick={() => handleSelectCategory(category)}>
                                       Size: {category.size} - Price: ${category.price}
                                    </MenuItem>
                                 ))}
                              </Menu>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                                 <Button
                                    sx={{ width: "200px" }}
                                    variant="outlined"
                                    onClick={handleClickOptions}
                                 >
                                    Select Options {"  "}
                                 </Button>
                              </Box>
                              <Menu
                                 anchorEl={anchorElOptions}
                                 open={openOptions}
                                 onClose={handleCloseOptions}
                              >
                                 {options.map((category, index) => (
                                    <MenuItem key={index} onClick={() => handleSelectOptions(category)}>
                                       {category}
                                    </MenuItem>
                                 ))}
                              </Menu>
                              <Box sx={{ display: "flex", justifyContent: "end" }}>
                                 <Button

                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddToCart}
                                    endIcon={<ShoppingCartIcon />}
                                 >
                                    Add to Cart
                                 </Button>
                              </Box>
                           </CardContent>
                        </Card>
                     </Grid></>
               );
            })}
         </Grid>
         <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
               variant="contained"
               color="primary"
               size="large"
               sx={{
                  borderRadius: '8px',
                  padding: '1rem 2rem',
                  fontSize: isSmallScreen ? '0.875rem' : '1rem',
                  boxShadow: 3,
                  '&:hover': {
                     boxShadow: 6,
                  },
               }}
               onClick={handleNav}
            >
               Go To Cart
            </Button>
         </Box>
      </>
   );
};

export default ProductCard;

