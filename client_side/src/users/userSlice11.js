import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInLecture } from '../lecture/LectureSlice'
// import { updateUserDetailes } from './path/to/file'
const initialState = {
    users: [{}],
    status: 'idle',
    userDetails: {},
    userStatus: 'idle',
    editStatus: 'add',
}

export const getUsers = createAsyncThunk(
    'getUsers',
    async () => {
        try {
            const response = await axios.get(`https://localhost:7094/api/User`);
            return response.data
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const getDetails = createAsyncThunk(
    'getDetails',
    async (id) => {
        console.log('in det dd');
        try {
            const response = await axios.get(`https://localhost:7094/api/User/${id}`);
            // let c = response.data.purchase_history;
            // for (let i = 0; i < c.length; i++) {
            //     const picture = await axios.get(`https://localhost:7094/api/Course/getImage/${c[i].course.picture}`);
            //     // console.log(response2.data); 
            //     c[i] = { ...c[i], pictureFile: picture.data };

            // }
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log("not courier");
                return ("not user");
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const postUser = createAsyncThunk(
    'postUser',
    async (user) => {
        try {
            console.log(user);
            const formData = new FormData();
            formData.append('firstName', user.firstName);
            formData.append('lastName', user.lastName);
            formData.append('email', user.email);
            formData.append('password', user.password);
            const response = await axios.post("https://localhost:7094/api/User", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const putUser = createAsyncThunk(
    'putUser',
    async (user) => {
        try {
            console.log(user);
            const formData = new FormData();
            formData.append('Id', user.id);
            formData.append('firstName', user.firstName);
            formData.append('lastName', user.lastName);
            formData.append('email', user.email);
            formData.append('password', user.password);
            const response = await axios.put(`https://localhost:7094/api/User/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const signIn = createAsyncThunk(
    'signIn',
    async (user, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('firstName',"l");
            formData.append('lastName', "l");
            formData.append('email', user.email);
            formData.append('password', user.password);
            const res = await axios.post(`https://localhost:7094/api/User/user/Login`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            alert(`user is connect`)
            localStorage.setItem('user', JSON.stringify({ ...user, id: +res.data, type: 'user' }));
            console.log(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
        } catch (error) {
               await thunkAPI.dispatch(signInLecture(user))

        }
    }
)
export const addViews = createAsyncThunk(
    'addViews',
    async (view) => {
        try {
            const formData = new FormData();
            formData.append('UserId', view.userId);
            formData.append('CategoryId', view.categoryId);
            formData.append('NumView', 1);
            const response = await axios.post('https://localhost:7094/api/Views', formData)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
);

export const updatehViews = createAsyncThunk(
    'updatehViews',
    async (view) => {
        try {
            const formData = new FormData();
            formData.append('Id', view.id);
            formData.append('UserId', view.userId);
            formData.append('CategoryId', view.categoryId);
            formData.append('NumView', view.numView);
            const response = await axios.put(`https://localhost:7094/api/Views/${view.id}`, formData)
            console.log('update');
            return view
            // return response.data            
        } catch (error) {
            console.log(error);
        }
    }
)




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEditStatus: (state, action) => {
            console.log('ee');
            state.editStatus = action.payload
        },
        updateUserDetailes: (state, action) => {
            console.log('ee');
            state.userDetails = action.payload
        },
        updateUserPurchase: (state, action) => {
            console.log('ee');
            state.userDetails = { ...state.userDetails, purchase_history: [...state.userDetails.purchase_history, action.payload]}
        },
        updateUserCOurse: (state, action) => {
            console.log('in updateUserCOurse');
            const date = new Date();
            const isoDateString = date.toISOString();
            state.userDetails.purchase_history.forEach(element => {
                if (element.endDate>=isoDateString)
                {
                    /// אם כן אז צריך להסיר את הקורס מרשימת הקורסים הפעילים
                }
            });
            state.userDetails = { ...state.userDetails, purchase_history: [...state.userDetails.purchase_history, action.payload], courses: [...state.userDetails.courses, action.payload.course] }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.users = action.payload
        })
        builder.addCase(getDetails.fulfilled, (state, action) => {
            state.userStatus = 'fulfilled'
            state.userDetails = action.payload
        })
        builder.addCase(postUser.fulfilled, (state, action) => {
            // state.userDetails = action.payload
            console.log("in post");
        })
        builder.addCase(putUser.fulfilled, (state, action) => {
            state.userDetails = action.payload
            console.log("in put");
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.userStatus = 'fulfilled'
            state.userDetails = action.payload
        })
        builder.addCase(addViews.fulfilled, (state, action) => {
            // state.viewsPerUserStatus = 'fulfilled'
            // state.viewsPerUser = action.payload
        })
        builder.addCase(updatehViews.fulfilled, (state, action) => {
            console.log("in case");
            console.log(action.payload);
            state.userDetails.views.forEach(element => {
                console.log(element.id);
                if (element.id == action.payload.id)
                    element.numView = action.payload.numView
            });
        })
    }
});


export const { } = userSlice.actions
export const { setEditStatus, updateUserDetailes, updateUserPurchase, updateUserCOurse } = userSlice.actions

export default userSlice.reducer