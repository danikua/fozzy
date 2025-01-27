import React from 'react';
import {
  Drawer,
  List,
  Typography,
  Divider,
  Button,
  Box,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { CartItem } from './CartItem';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const { state } = useCart();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      className="w-full max-w-md"
    >
      <Box className="w-80 sm:w-96 p-4">
        <Typography variant="h6" className="mb-4">
          Shopping Cart
        </Typography>
        {state.items.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty</Typography>
        ) : (
          <>
            <List>
              {state.items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </List>
            <Divider className="my-4" />
            <Typography variant="h6" className="mb-4">
              Total: ${state.total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onClose}
            >
              Checkout
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};