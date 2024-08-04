

import React, { useState } from 'react';
import css from './OrderHistoryModal.module.css';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import OrderDetailsModal from './OrderDetailsModal';
import { url } from '../../Constant/constant';

const OrderHistoryModal = ({ isOpen, onClose, orders, loggedIn }) => {
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const viewOrder = async (id) => {
    try {
      const { data } = await axios.get(`${url}/orders/${id}`, {
        headers: {
          authorization: `Bearer ${loggedIn}`
        }
      });

      if (data.status) {
        setSelectedOrder(data.result);
        setOrderDetailsOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch order details", error);
    }
  }

  return (
    <div className={`${css.modal} ${isOpen ? css.open : ''}`}>
      <Box className={css.content}>
        <Typography variant="h4" gutterBottom>
          Order History
        </Typography>
        <button className={css.closeButton} onClick={onClose}>X</button>
        {
            orders.length > 0 ? <div className={css.orderList}>
            {orders.map((order, index) => (
              <div key={order.id} className={css.orderItem} onClick={() => viewOrder(order.id)}>
                <Typography>{index + 1}</Typography>
                <Typography>Total Cost: ${order.totalCost}</Typography>
              </div>
            ))}
          </div> :"No Order History"
        }
        
      </Box>
      <OrderDetailsModal
        isOpen={orderDetailsOpen}
        onClose={() => setOrderDetailsOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderHistoryModal;
