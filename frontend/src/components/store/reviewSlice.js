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

export const fetchMyReviews = createAsyncThunk(
    'review/fetchMyReviews',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/transaction/${id}/reviews`);
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to fetch reviews');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

export const updateReview = createAsyncThunk(
    'review/updateReview',
    async ({ comment, rating, id }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/transaction/${id}/review`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment, rating, id }), // Match the key names
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to update review');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

export const fetchFigurineReviews = createAsyncThunk(
    'review/fetchFigurineReviews',
    async (figId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/transaction/${figId}/FigurineReviews`);
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to fetch reviews');
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
        reviews: [],
        myreviews:[],
        figreviews: [], // Presumably contains fetched reviews
    },
    reducers: {
        resetReviewState: (state) => {
            state.figreviews = [];
        }
    },


    extraReducers: (builder) => {
        builder
            // Handle review creation
            .addCase(createReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews.push(action.payload); // Add new review to state
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
            })

            // Handle fetching user-specific reviews
            .addCase(fetchMyReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.myreviews = action.payload; // Update myreviews with fetched reviews
                console.log(state.myreviews); // Debugging purpose
            })
            .addCase(fetchMyReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
                toast.error(`Error: ${state.error}`, {
                    autoClose: 750,
                });
            })



            .addCase(updateReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Review updated successfully', {
                    autoClose: 750,
                });
                
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
                toast.error(`Error: ${state.error}`, {
                    autoClose: 750,
                });
                console.log(state.error);
            })


            .addCase(fetchFigurineReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFigurineReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.figreviews = action.payload; // Update myreviews with fetched reviews
                console.log(state.figreviews); // Debugging purpose
                
            })
            .addCase(fetchFigurineReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
                toast.error(`Error: ${state.error}`, {
                    autoClose: 750,
                });
                state.figreviews = [];
                console.log(state.error);
            });
    },
});
export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
