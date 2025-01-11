import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartProvider, useCart } from './context/CartContext';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" className="flex-grow">
            Fake Store
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => setIsCartOpen(true)}
          >
            <Badge badgeContent={state.items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <ProductList />
      </main>
      <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
};