import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    token : null,
    user : null,
}

export const storeFCMToken = createAsyncThunk(
    'user/storeFCMToken',
    async (token, { rejectWithValue }) => {
        try {
            
            const userid = JSON.parse(localStorage.getItem('user'))._id;
            const id = userid;
            console.log("id", id, token);
            const response = await axios.put('/api/auth/user/fcmToken', { token, id });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(storeFCMToken.fulfilled, (state, action) => {
                state.token = action.payload.data;
            });
    },
});


export const { setUser } = userSlice.actions;

export default userSlice.reducer;

