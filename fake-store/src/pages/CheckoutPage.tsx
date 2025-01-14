import React from "react";
import { useLocation } from "react-router-dom";
import { OrderForm } from "../components/OrderForm";

export const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  return (
    <div>
      <OrderForm totalAmount={totalAmount} />
    </div>
  );
};
