import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Alert, AlertTitle } from '@mui/material';

const CheckoutModal = ({ isModalOpen, message, messageType }) => {
  return (
    <Dialog open={isModalOpen} >
      <DialogContent>
        <Alert severity={messageType}>
          <AlertTitle>{messageType}</AlertTitle>
          {message}
        </Alert>
      </DialogContent>

    </Dialog>
  );
};

export default CheckoutModal;
