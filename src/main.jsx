import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Login from './components/Login/Login';
import SignUp from './components/Register/SignUp';
import { createContext, useState } from 'react';
import Checkout from './components/Checkout/Checkout';
import { CartProvider } from './context/CartContext';
import OrderList from './components/orderList/OrderList';

export const AuthContext = createContext();

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  return (
    <CartProvider>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderList/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </CartProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);