import React, { useState } from "react";
import { TextField, Button, Box, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const OrderForm: React.FC<{ totalAmount: number }> = ({
  totalAmount,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    cardExpiration: "",
    cardCVV: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            Order Confirmed!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Thank you for your purchase. You will receive an email confirmation
            shortly.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          p: 4,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Complete Your Order
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Shipping Information
        </Typography>
        <TextField
          name="name"
          label="Full Name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="address"
          label="Address"
          variant="outlined"
          fullWidth
          value={formData.address}
          onChange={handleChange}
          required
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            name="city"
            label="City"
            variant="outlined"
            fullWidth
            value={formData.city}
            onChange={handleChange}
            required
          />
          <TextField
            name="zip"
            label="ZIP Code"
            variant="outlined"
            fullWidth
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Payment Details
        </Typography>
        <TextField
          name="cardNumber"
          label="Card Number"
          variant="outlined"
          fullWidth
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            name="cardExpiration"
            label="Expiration Date (MM/YY)"
            variant="outlined"
            fullWidth
            value={formData.cardExpiration}
            onChange={handleChange}
            required
          />
          <TextField
            name="cardCVV"
            label="CVV"
            variant="outlined"
            fullWidth
            value={formData.cardCVV}
            onChange={handleChange}
            required
          />
        </Box>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Total: ${totalAmount.toFixed(2)}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={clearCart}
        >
          Place Order
        </Button>
      </Box>
    </motion.form>
  );
};
