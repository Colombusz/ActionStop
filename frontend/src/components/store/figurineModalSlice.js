

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// REDUX FOR OPENING MODAL TO DISPLAY INFORMATION ON THE PRODUCT ========================
export const fetchModalFigurine = createAsyncThunk(
    'figurines/fetchModalFigurine',
    async (id) => {
      try {
        const response = await fetch(`/api/figurines/${id}`);
        
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
  
  
  const modalinitialState = {
    open: false,
    figurine: null, 
    error: null,   
    loading: false, 
  };
  
  const figurineModalSlice = createSlice({
    name: 'modalFigurines',
    initialState: modalinitialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchModalFigurine.pending, (state) => {
          state.loading = true;
          state.open = false; 
          state.error = null;
        })  
        .addCase(fetchModalFigurine.fulfilled, (state, action) => {
          state.loading = false;
          state.open = true; 
          state.figurine = action.payload; 
        })
        .addCase(fetchModalFigurine.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.open = false; 
        });
    },
  });
  export default figurineModalSlice.reducer;
  // END OF MODAL LOGIC===================================================================================================
  
  