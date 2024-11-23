import React from "react";
import MainNavbar from "../common/navbar";
import ResponsiveFooter from "../common/footer";
import OrderContainer from "../ui/orderContainer";
import { fetchOrders } from "../store/utilitiesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Purchases = () => {
    const dispatch = useDispatch();
    

    const orders = useSelector((state) => state.orders?.Things || []);
    const loading = useSelector((state) => state.orders?.loading);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user._id : null;
        dispatch(fetchOrders(userId));
    }, [dispatch]); // Default to empty array if undefined
    console.log( orders);


  return (
    <div className="min-h-screen flex flex-col mt-12">
      <MainNavbar />
      <div className="w-full mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Purchase History</h1>
            {orders && orders.length > 0 ? (
                orders.map((order) => (
                    <OrderContainer key={order._id} order={order} />
                ))
            ) : (
                <p>No orders found.</p> // This can display a message when there are no orders
            )}
        </div>
      <ResponsiveFooter />
    </div>
  );
};

export default Purchases;
