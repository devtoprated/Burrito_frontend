

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import HomePageBanner from './components/HomeComponents/HomePageBanner/HomePageBanner';
import Footer from './components/Footer/Footer';
import ProductCard from './components/Card/ProductCard';
import { url } from './Constant/constant';
import CheckoutModal from './components/Model/CheckoutModel';
import { useContext } from 'react';
import { AuthContext } from './main';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';

function App() {
  const [products, setProducts] = useState([]);
  const [addCart, setAddCart] = useState([]);
  const { cart } = useCart();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(0)
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${url}/burrito`);
      console.log(data);
      setProducts(data.result);
    };

    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(token)
    }


    fetchProducts();
  }, []);



  const handleCheckout = () => {
    navigate("checkout")
  }
  return (
    <>
      <HomePageBanner />

      <div>
        <Typography style={{ padding: "20px 55px" }} variant="h3" component="h2">
          All Products
        </Typography>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
            {products?.map((item) => (
              <ProductCard key={item.id} product={item} setAddCart={setAddCart} addCart={addCart} />
            ))}
          </div>
          <div style={{ float: 'right' }}>
            {cart.length > 0 ? (
              <Button variant="contained" color="primary" onClick={handleCheckout} style={{padding:'30px',borderRadius:'100%'}}>
                Check cart
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div></div>
      <Footer />
    </>
  );
}

export default App;
