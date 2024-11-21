import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Async action to fetch the list of favorite figurines
export const fetchFavorites = createAsyncThunk(
  'figurines/fetchFavorites',
  async (userId) => {
    try {
      const response = await fetch(`/api/transaction/${userId}/fetchFavorites`, {
        method: 'GET',
        // Add headers if necessary, e.g., for authentication:
        // headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.message}`);
      }

      const data = await response.json();
      if (!data) throw new Error('No data returned from the API');
      
      return data;  // Assuming this is the favorite list
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  }
);


// Slice to manage favorites
const fetchFavoritesSlice = createSlice({
  name: 'fetchFavourites',
  initialState: {
    loading: false,
    error: null,
    favorites: [], // Store the list of favorite figurines here
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;  // assuming the response contains the list of favorites
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        toast.error = action.error.message;
      });
  },
});

export default fetchFavoritesSlice.reducer;
