import { createSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export const add2Favorite = asyncThunkCreator(

    'figurines/add2Favorite',
    async (figurineId, userId) => {
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
            console.log("Data: ", data)
            return data;
        } catch (error) {
            throw new Error(error.message || 'Something went wrong');
        }
    }
);

const add2FavoriteSlice = createSlice({
    name: 'add2Favorite',
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(add2Favorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(add2Favorite.fulfilled, (state) => {
                state.loading = false;
                toast.success('Added to Favorites');
            })
            .addCase(add2Favorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action.error.message);
            });
    },
});

export default add2FavoriteSlice.reducer;