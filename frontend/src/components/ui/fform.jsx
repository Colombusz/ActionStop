import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const ShippingDetails = () => {
  const [formData, setFormData] = useState({
    shippingAddress: '',
    paymentMethod: 'Cash on Delivery',
    shippingPrice: 20.0,
    totalPrice: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
  };

  return (
<div className="bg-purple-300 flex items-center justify-center py-4">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', padding: '6px' }}>
    <TextField
      label="Shipping Address"
      name="shippingAddress"
      value={formData.shippingAddress}
      onChange={handleChange}
      required
      fullWidth
    />
    <TextField
      label="Payment Method"
      name="paymentMethod"
      value={` ${formData.paymentMethod}`}
      disabled = {true}
      required
      fullWidth
    />
    <TextField
      label="Shipping Price"
      name="shippingPrice"
      
      value={`$ ${formData.shippingPrice}`}
      disabled = {true}
      required
      fullWidth
    />
    <TextField
      label="Total Price"
      name="totalPrice"
      
      value={`$ ${formData.totalPrice}`}
      disabled = {true}
      required
      fullWidth
    />
    <Button onClick={handleSubmit} variant="contained" color="primary" endIcon={<CheckCircleOutline/>}>
        Complete Order
    </Button>
  </div>
</div>

  );
};

export default ShippingDetails;
