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