import React from 'react';
import {
  Avatar,
  IconButton,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem as CartItemType } from '../types/types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        marginBottom: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: 3,
      }}
    >
      {/* Product Image and Info */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} sm={3}>
          <Avatar
            variant="square"
            src={item.product.image}
            alt={item.product.title}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 1,
            }}
          />
        </Grid>

        <Grid item xs={8} sm={6}>
          <Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem' },
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.product.title}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                marginTop: 1,
              }}
            >
              {`$${(item.product.price * item.quantity).toFixed(2)}`}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => removeFromCart(item.product.id)}
            sx={{
              padding: 1,
              backgroundColor: '#f44336',
              color: 'white',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Quantity Field */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'auto',
          paddingTop: 2,
        }}
      >
        <TextField
          type="number"
          label="Quantity"
          value={item.quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value > 0) {
              updateQuantity(item.product.id, value);
            }
          }}
          InputProps={{ inputProps: { min: 1 } }}
          size="small"
          sx={{
            width: '100%',
            maxWidth: 120,
          }}
        />
      </Box>
    </Paper>
  );
};
