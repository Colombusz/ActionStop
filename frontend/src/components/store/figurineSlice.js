
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk for fetching figurines
export const fetchFigurines = createAsyncThunk(
    'figurines/fetchFigurines',
    async () => {
      try {
        const response = await fetch('/api/figurines');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("Data: ", data)
        return data; 
      } catch (error) {
        throw new Error(error.message || 'Something went wrong');
      }
    }
  );
  

const initialState = {
  figurines: [],
  loading: false,
  error: null,
};

const figurineSlice = createSlice({
  name: 'figurines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFigurines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFigurines.fulfilled, (state, action) => {
        state.loading = false;
        state.figurines = action.payload.data;
      })
      .addCase(fetchFigurines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});






export default figurineSlice.reducer;

