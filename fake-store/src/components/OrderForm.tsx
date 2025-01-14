import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  cardExpiration: string;
  cardCVV: string;
};

export const OrderForm: React.FC<{ totalAmount: number }> = ({
  totalAmount,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const onSubmit = (data: FormData) => {
    console.log("Order Data:", data);
    setIsSubmitted(true);
    clearCart();
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
            onClick={() => navigate("/")}
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
      onSubmit={handleSubmit(onSubmit)}
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

        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Full Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                variant="outlined"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
          <Controller
            name="zip"
            control={control}
            defaultValue=""
            rules={{
              required: "ZIP Code is required",
              pattern: {
                value: /^\d{5}$/,
                message: "Enter a valid 5-digit ZIP Code",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="ZIP Code"
                variant="outlined"
                fullWidth
                error={!!errors.zip}
                helperText={errors.zip?.message}
              />
            )}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Payment Details
        </Typography>
        <Controller
          name="cardNumber"
          control={control}
          defaultValue=""
          rules={{
            required: "Card Number is required",
            pattern: {
              value: /^\d{16}$/,
              message: "Enter a valid 16-digit card number",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Card Number"
              variant="outlined"
              fullWidth
              error={!!errors.cardNumber}
              helperText={errors.cardNumber?.message}
            />
          )}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Controller
            name="cardExpiration"
            control={control}
            defaultValue=""
            rules={{
              required: "Expiration date is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "Enter a valid date (MM/YY)",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Expiration Date (MM/YY)"
                variant="outlined"
                fullWidth
                error={!!errors.cardExpiration}
                helperText={errors.cardExpiration?.message}
              />
            )}
          />
          <Controller
            name="cardCVV"
            control={control}
            defaultValue=""
            rules={{
              required: "CVV is required",
              pattern: {
                value: /^\d{3}$/,
                message: "Enter a valid 3-digit CVV",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="CVV"
                variant="outlined"
                fullWidth
                error={!!errors.cardCVV}
                helperText={errors.cardCVV?.message}
              />
            )}
          />
        </Box>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Total: ${totalAmount.toFixed(2)}
        </Typography>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Place Order
        </Button>
      </Box>
    </motion.form>
  );
};
