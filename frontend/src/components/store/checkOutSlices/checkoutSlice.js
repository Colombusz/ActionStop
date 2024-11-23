import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  figurines: [],
  fields: [],
  loading: false,
  error: null,
};
const user = JSON.parse(localStorage.getItem("user")); // Access `localStorage` on the client
if (user) {
  const userId = user._id;
}

export const sendCheckoutData = createAsyncThunk(
  "checkout/sendCheckoutData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().checkout;
      const { fields, figurines } = state;

      const payload = { fields, figurines, userId };

      // Send API request
      const response = await axios.post("/api/transaction/checkout", payload);
      return response.data; // Return data on success
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to complete checkout."
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    stores: (state, action) => {
      const { address, payment, status, shipfee, total } = action.payload;

      if (!address) {
        toast.error("Address is required", { autoClose: 750 });
        return;
      }

      state.fields = [{ address, payment, status, shipfee, total }];
    },
    addCartItems: (state) => {
      const storedData = localStorage.getItem("cartData");
      const items = storedData ? JSON.parse(storedData) : { cartItems: [] };

      state.figurines = items.cartItems.map(({ id, quantity }) => ({
        id,
        quantity,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCheckoutData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendCheckoutData.fulfilled, (state) => {
        state.loading = false;
        state.fields = [];
        state.figurines = [];
        toast.success("Checkout successful!");
      })
      .addCase(sendCheckoutData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Checkout failed.");
      });
  },
});

export const { stores, addCartItems } = checkoutSlice.actions;
export default checkoutSlice.reducer;
