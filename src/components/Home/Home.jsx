import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, useMediaQuery, useTheme, Grid, Button } from '@mui/material';
import Footer from "../../components/Footer/Footer"
import { useNavigate } from 'react-router-dom';

import { FoodItemsList } from '../../utils/Foodlist';
import HomePageBanner from './HomePageBanner';
import HotDishes from '../HotDishes/HotDishes';
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function Home({ products }) {

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const hanldeOrderNavigate = () => {
    navigate("/products")
  }
  return (
    <>
      <HomePageBanner />

      <Box sx={{ padding: isSmallScreen ? "2rem 1rem" : "5rem 0", backgroundColor: theme.palette.background.default }}>
        <Container>
          <Box sx={{ padding: "1rem 0", textAlign: "center" }}>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                mb: 5
              }}
            >
              <Typography
                variant={isSmallScreen ? "h5" : "h4"}
                component="h4"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  letterSpacing: '1px',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                Our Fresh And Healthy Dishes
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'orange',
                  zIndex: 0
                }}
              />
            </Box>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            {FoodItemsList.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Box
                  sx={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <img
                    {...srcset(item.url, 164, 1, 1)}
                    alt={item.id}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      maxHeight: "200px", minHeight: "200px", objectFit: "cover", margin: "5px"
                    }}
                  />
                </Box>

              </Grid>

            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
              px: 2,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                mb: 5
              }}
            >
              <Typography
                variant={isSmallScreen ? "h5" : "h4"}
                component="h4"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  letterSpacing: '1px',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                Our Trending Dishes
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'orange',
                  zIndex: 0
                }}
              />
            </Box>
            <Grid container spacing={5} justifyContent="center">
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={product.id}>
                  <HotDishes
                    product={product}
                    onAddToCart={() => { }}
                    onViewDetails={() => { }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
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
              onClick={hanldeOrderNavigate}
            >
              Order Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}

export default Home;
