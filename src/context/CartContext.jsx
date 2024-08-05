import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Context
const CartContext = createContext();

// Cart Provider Component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  console.log("cartcartcart", cart)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null; // Mark for removal
          }
        }
        return item;
      }).filter(Boolean); // Remove null items
      return updatedCart;
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedCart;
    });
  };


  const addToCart = (item) => {
    const exists = cart.find(items => items.id === item.id );
    if (exists) {
      return 'Product  already exists in the cart!';
    }
    if(!item.size){
      return 'Please choose product category';
    }
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.options === item.options
      );

      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
    return "product added to Cart";
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,increaseQuantity,decreaseQuantity ,clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
