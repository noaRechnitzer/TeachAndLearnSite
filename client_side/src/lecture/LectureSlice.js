import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'


const initialState = {
    lectures: [],
    statusLecture: 'idle',
    selectedLecture: {},
    selectedStatus: 'idle',
    editStatus:'add'
}



export const fetchLectures = createAsyncThunk(
    'lectures/fetchLectures',
    async (thunkAPI) => {
        console.log('in fetchCourses');
        const response = await axios.get('https://localhost:7094/api/Lecture')
        let c = response.data;

        return response.data
    }
)
export const fetchLectureById = createAsyncThunk(
    'lectures/fetchLectureById',
    async (id,thunkAPI) => {
        const courses = thunkAPI.getState().courses.courses; // Access from state
        console.log('in fetchLectureById');
        console.log(courses);
        const response = await axios.get(`https://localhost:7094/api/Lecture/${id}`)

        console.log("----");
        console.log(response.data);
        return response.data
    }
)

export const postLecture = createAsyncThunk(
    'postLecture',
    async (user) => {
        try {
            console.log(user);
            const formData = new FormData();
            formData.append('firstName', user.firstName);
            formData.append('lastName', user.lastName);
            formData.append('description', user.description);
            formData.append('email', user.email);
            formData.append('userName', 'dfdf');
            formData.append('password', user.password);
            formData.append('picture', "ss");
            formData.append('fileImage', user.currentFileImage);
            const response = await axios.post("https://localhost:7094/api/Lecture", formData, {
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
export const putLecture = createAsyncThunk(
    'putLecture',
    async (user) => {
        try {
            console.log(user);
            const formData = new FormData();
            formData.append('id', user.id);
            formData.append('firstName', user.firstName);
            formData.append('lastName', user.lastName);
            formData.append('description', user.description);
            formData.append('email', user.email);
            formData.append('password', user.password||"*****");
            console.log(user.imageS);
            if (user.imageS==true) {
                console.log("==========");
                formData.append('picture', 'pp');
                formData.append('fileImage', user.currentFileImage);
            }
            formData.append('picture', user.picture);
            const response = await axios.put(`https://localhost:7094/api/Lecture/${user.id}`, formData, {
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

export const signInLecture = createAsyncThunk(
    'signInLecture',
    async (user) => {
        try {
            const formData = new FormData();
            formData.append('firstName', "ww");
            formData.append('lastName', "ww");
            formData.append('description', "ww");
            formData.append('email', user.email);
            formData.append('userName', "ww");
            formData.append('password', user.password);
            const res = await axios.post(`https://localhost:7094/api/Lecture/lecture/Login`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            alert(`lecture is connect`)
            localStorage.setItem('user', JSON.stringify({...user,id:+res.data,type:'lecture'}));
            console.log(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null);
        } catch (error) {
            console.log(error);
            alert(error.response.data)
        }
    }
);
export const setCategories = createAsyncThunk(
    'setCategories',
    async (categories) => {

    }
);
export const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {
        setEditStatusLecture: (state,action) => {
            console.log('ee-=--=--');
            state.editStatus=action.payload
          },
        updateLectureDeatails: (state,action) => {
            console.log('ee-=--=--');
            state.selectedLecture={...state.selectedLecture,courses:[...state.selectedLecture.courses,action.payload]}
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLectures.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.lectures = action.payload
        })
        builder.addCase(fetchLectureById.fulfilled, (state, action) => {
            console.log('in fetchLectureById');
            state.selectedStatus = 'fulfilled'
            state.selectedLecture = action.payload
        })
        builder.addCase(postLecture.fulfilled, (state, action) => {
            state.selectedLecture = action.payload
            console.log("in put");
        })
        builder.addCase(putLecture.fulfilled, (state, action) => {
            state.selectedLecture= action.payload
            console.log("in put");
        })
        builder.addCase(signInLecture.fulfilled, (state, action) => {
            // state.userDetails = action.payload
            console.log("in signInLecture");
        })
    },
})
export const { } = lectureSlice.actions
export const { setEditStatusLecture,updateLectureDeatails} = lectureSlice.actions
export default lectureSlice.reducer