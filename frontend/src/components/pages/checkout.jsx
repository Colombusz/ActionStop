import React from 'react';
import MainNavbar from '../common/navbar';
import ResponsiveFooter from '../common/footer';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import FigurineHolder from '../ui/figurineHolder';
import ShippingForm from '../ui/fform';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const items = useSelector((state) => state.cart.cartItems);
    // const items = JSON.parse(localStorage.getItem('cartData')) || [];
    console.log(items);
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header or Navbar */}
            <div className="fixed top-0 w-full z-10">
                <MainNavbar />
            </div>

            {/* Main content */}
            <div className="mt-[8rem] flex-1 p-4">
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <Box sx={{ border: '2px black' }} className="flex items-center bg-purple-300 p-5 rounded-lg shadow-md w-full mt-2 mb-2  ">
                <Grid item xs={3}>
                <Box sx={{ border: '2px black' }} className="flex items-center bg-purple-500 p-5 rounded-lg shadow-md w-full mt-2 mb-2  ">
                    CheckOut
                </Box>
                </Grid>
                            
                </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box component="section" sx={{ border: '2px dashed black' }} className="bg-pink-200">
                    {Array.isArray(items) &&
                    items.map((item) => (
                        <FigurineHolder figurine={item} key={item.id} />
                    ))}
                    </Box>
                </Grid>
                <Grid item xs={4 } >
                
                    <ShippingForm />
                </Grid>
                
                </Grid>
            </div>

            {/* Footer */}
            <ResponsiveFooter />
            </div>
    );
};

export default Checkout;
