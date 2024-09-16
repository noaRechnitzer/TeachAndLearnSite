import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import {updateUserPurchase} from '../users/userSlice11'
const initialState = {
    purchases: [],
    status: 'idle'
}


export const fetchPurchase = createAsyncThunk(
    'fetchPurchase',
    async () => {
        try {
            const res = await axios.post("https://localhost:7094/api/Purchase")
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const postPurchase = createAsyncThunk(
    'postPurchase',
    async (purchase,thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('subscriptionsType',purchase.subscriptionsType);
            formData.append('sum', purchase.sum);
            formData.append('startDate', purchase.startDate);
            formData.append('endDate', purchase.endDate);
            formData.append('userId', purchase.userId);
            formData.append('courseId', purchase.courseId);
            console.log(purchase);
            const res = await axios.post("https://localhost:7094/api/Purchase",purchase);
            console.log("Post created:");
            console.log(res);
            thunkAPI.dispatch(updateUserPurchase(res.data));
            // thunkAPI.dispatch.updateUserPurchase({purchase_history: [...thunkAPI.getState().users.userDetails.purchase_history, res.data]})

            return res.data
        } catch (error) {
            console.error("Error creating post:", error);
        }
        return {}
    }
);
export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        updateNewCategoryImage: (state, action) => {
            // state.newCategoryImage = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPurchase.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.purchases = action.payload
        })
        builder.addCase(postPurchase.fulfilled, (state, action) => {
            console.log("in post");
            // state.newCategory = {}
        })
    },
})
export const { } = purchaseSlice.actions
export default purchaseSlice.reducer