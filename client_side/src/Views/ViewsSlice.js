import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'


const initialState = {
    viewsPerUser: [{}],
    viewsPerUserStatus: 'idle'
}



export const fetchViewsPerUser = createAsyncThunk(
    'views/fetchViewsPerUser',
    async (id) => {
        try {
            const response = await axios.get(`https://localhost:7094/api/Views/user/${id}`)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

// export const addViews = createAsyncThunk(
//     'views/addViews',
//     async (view) => {
//         try {
//             const formData = new FormData();
//             formData.append('UserId', view.userId);
//             formData.append('CategoryId', view.categoryId);
//             formData.append('NumView', 1);
//             const response = await axios.post('https://localhost:7094/api/Views', formData)
//             return response.data
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )

// export const updatehViews = createAsyncThunk(
//     'views/updatehViews',
//     async (view) => {
//         try {
//             const formData = new FormData();
//             formData.append('Id', view.id);
//             formData.append('UserId', view.userId);
//             formData.append('CategoryId', view.categoryId);
//             formData.append('NumView', view.numView);
//             const response = await axios.put(`https://localhost:7094/api/Views/${view.id}`, formData)
//             console.log('update');
//             return view
//             // return response.data            
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )

export const viewsSlice = createSlice({
    name: 'views',
    initialState,
    reducers: {
        setEditStatus: (state, action) => {
            console.log('ee-=--=--');
            state.editStatus = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchViewsPerUser.fulfilled, (state, action) => {
            state.viewsPerUserStatus = 'fulfilled'
            state.viewsPerUser = action.payload
        })
        // builder.addCase(addViews.fulfilled, (state, action) => {
        //     state.viewsPerUserStatus = 'fulfilled'
        //     state.viewsPerUser = action.payload
        // })
        // builder.addCase(updatehViews.fulfilled, (state, action) => {
        //     console.log("in case");
        //     console.log(action.payload);
        //     state.viewsPerUser.forEach(element => {
        //         console.log(element.id);
        //         if(element.id==action.payload.id)
        //             element.numView=action.payload.numView
        //     });
        // })
    },
})
export const { } = viewsSlice.actions
export const { setEditStatus } = viewsSlice.actions
export default viewsSlice.reducer