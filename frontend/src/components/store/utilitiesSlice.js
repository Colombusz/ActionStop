import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    Things: [],  // Store the orders in Things
    review: [],
    figurines: [],
    loading: false,
    error: null
};

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/transaction/${id}/orders`);
            return response.data;  // Assuming response data has orders directly
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'orders/cancelOrder',
    async ({ id, orderid }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/transaction/${orderid}/cancelOrder`, {
                id, 
                orderid
            });
            return response.data;  // Assuming response data has the updated order
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addReview: (state, action) => {
            const { id, review } = action.payload;
            state.review.push({ id, review });
        },
        addFigurine: (state, action) => {
            const { id, name, origin, price, image, quantity, stock } = action.payload;
            state.figurines.push({ id, name, origin, price, image, quantity, stock });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.Things = action.payload?.data || [];  // Populate 'Things' with orders data
                console.log(state.Things);  // Log 'Things' instead of 'Orders'
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.Things = action.payload?.data || [];  // Populate 'Things' with orders data
                console.log(state.Things);
                toast.warning("Order Cancelled")  // Log 'Things' instead of 'Orders'
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addReview, addFigurine } = orderSlice.actions;

export default orderSlice.reducer;
