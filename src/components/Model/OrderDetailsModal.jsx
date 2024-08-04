import React from 'react';
import css from './OrderDetailsModal.module.css';
import { Box, Typography } from '@mui/material';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <div className={`${css.modal} ${isOpen ? css.open : ''}`}>
      <Box className={css.content}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>
        <button className={css.closeButton} onClick={onClose}>X</button>
        <div className={css.orderInfo}>
          <Typography>Total Cost: ${order.totalCost}</Typography>
          <Typography>Order Date: {new Date(order.createdAt).toLocaleString()}</Typography>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          {order.orderItems.map(item => (
            <div key={item.id} className={css.orderItem}>
              <Typography>Burrito: {item.burrito.name}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Options: {item.options || "No"}</Typography>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default OrderDetailsModal;
