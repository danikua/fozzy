import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartProvider, useCart } from "./context/CartContext";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { CheckoutPage } from "./pages/CheckoutPage";

// Создание темы Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false); // Состояние для открытия корзины
  const { state } = useCart(); // Получение состояния корзины из контекста

  return (
    <>
      <CssBaseline />
      {/* Верхняя панель приложения */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fake Store
          </Typography>
          <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={state.items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 2 }}>
        {/* Определение маршрутов */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Box>
      {/* Компонент корзины */}
      <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};
