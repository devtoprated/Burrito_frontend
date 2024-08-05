import React  from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Register/SignUp';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute"
import OrderList from "./components/orderList/OrderList"
import Checkout from "./components/Checkout/Checkout"
import axios from 'axios';
import { url } from './Constant/constant';
function Main() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${url}/burrito`);
      console.log(data);
      setProducts(data.result);
    };

    fetchProducts();
  }, []);
  return (
    <AuthProvider>
      <CartProvider>

        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/products" element={
            <ProtectedRoute element={<Products products={products} />} />
          } />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute element={<Checkout />} />
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute element={<OrderList />} />
            }
          />
        </Routes>

      </CartProvider>
    </AuthProvider>
  );
}

export default Main;
