// add2FavoriteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Async action to add figurine to favorites
export const add2Favorite = createAsyncThunk(
  'figurines/add2Favorite',
  async ({ figurineId, userId }) => {
    try {
      const response = await fetch(`/api/transaction/${figurineId}/add2fave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ figurineId, userId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;  // Assuming this is the favorite list or confirmation data
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  }
);

// Slice to manage favorites
const add2FavoriteSlice = createSlice({
  name: 'add2Favorite',
  initialState: {
    loading: false,
    error: null,
    favorites: [], // Store the list of favorite figurines here
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(add2Favorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(add2Favorite.fulfilled, (state, action) => {
        state.loading = false;
        const newFavorite = action.payload;  // assuming the response contains the added figurine
        state.favorites.push(newFavorite);  // Add the figurine to the favorites list
        toast.success('Added to Favorites');
      })
      .addCase(add2Favorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Already in Favorites");
      });
  },
});

export default add2FavoriteSlice.reducer;
