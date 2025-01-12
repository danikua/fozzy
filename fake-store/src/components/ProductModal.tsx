import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Rating,
  Box,
} from '@mui/material';
import { Product } from '../types/types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ open, product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Product Image */}
          <Box sx={{ width: { xs: '100%', md: '33%' } }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 8,
              }}
            />
          </Box>

          <Box sx={{ width: { xs: '100%', md: '66%' } }}>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Rating value={product.rating.rate} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                ({product.rating.count} reviews)
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 4 }}>
              {product.description}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Category: {product.category}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addToCart(product);
            onClose();
          }}
        >
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};
