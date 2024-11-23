import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Thunk for creating a review
export const createReview = createAsyncThunk(
    'review/createReview',
    async ({ figId, comment, rating, userid, orderid }, { rejectWithValue }) => {
        // console.log(userid);
        try {
            const response = await fetch(`/api/transaction/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ figId, comment, rating, userid, orderid }), // Match the key names
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to submit review');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        loading: false,
        error: null,
        reviews: [], // Presumably contains fetched reviews
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews.push(action.payload); // Update state with new review
                toast.success('Review added successfully', {
                    autoClose: 750,
                });
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
                toast.error(`Error: ${state.error}`, {
                    autoClose: 750,
                });
            });
    },
});

export default reviewSlice.reducer;
