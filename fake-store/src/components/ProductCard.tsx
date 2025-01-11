import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Product } from '../types/types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenModal: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal }) => {
  const { addToCart } = useCart();

  return (
    <Card className="h-full flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        className="object-cover p-4 w-full sm:h-40 md:h-48 lg:h-56 xl:h-64 min-h-[160px]"  // Забезпечення однакових розмірів для карток
      />
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="mb-4">
          <Typography variant="h6" component="div" className="line-clamp-2 mb-2 font-semibold text-lg">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="text-xl font-semibold">
            ${product.price.toFixed(2)}
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => addToCart(product)}
            className="flex-1 text-white font-medium py-2 px-4 transition-transform transform hover:scale-105"
          >
            Add to Cart
          </Button>
          <Button 
            variant="outlined" 
            onClick={onOpenModal}
            className="flex-1 border-primary text-primary font-medium py-2 px-4 transition-transform transform hover:scale-105"
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
