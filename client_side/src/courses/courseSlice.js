import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { updateCourseOfCategories } from "../category/CategorySlice";
import { updateLectureDeatails } from "../lecture/LectureSlice";

const initialState = {
    courses: [],
    status: 'idle',
    selectedCourse: {},
    selectedStatus: 'idle',
    newCourse: {
        name: '',
        description: '',
        price_now: 0,
        language: 0,
        num_chapter: 0,
        duration: 0,
        lectureId: 2,
        categoriesId: 3,
        categories: []
    },
    newCourseStatus: 'idle',
    editStatus: 'add'
}

export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (thunkAPI) => {
        console.log('in fetchCourses');
        const response = await axios.get('https://localhost:7094/api/Course')
        // let c = response.data;
        // for (let i = 0; i < c.length; i++) {
        //     try {
        //         const picture = await axios.get(`https://localhost:7094/api/Course/getImage/${c[i].picture}`);
        //         console.log("====");
        //         console.log(picture);
        //         c[i] = { ...c[i], pictureFile: picture.data };
        //     } catch (error) {
        //         console.log(error);
        //     }

        // }
        console.log(response.data);
        return response.data
    }
)

export const getCourseById = createAsyncThunk(
    'courses/getCourseById',
    async (id) => {
        try {
            const response = await axios.get(`https://localhost:7094/api/Course/${id}`)
            // const picture = await axios.get(`https://localhost:7094/api/Course/getImage/${response.data.picture}`);
            // response.data = { ...response.data, FileImage: picture.data };
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const setSelectedCourse = createAsyncThunk(
    'courses/setSelectedCourse',
    (course) => {
        console.log("[[[[");
        console.log(course);
        return course;
    }
)

export const getCourseByIdVideo = createAsyncThunk(
    'courses/getCourseByIdVideo',
    async (videoUrl) => {
        try {
            const video = await axios.get(`https://localhost:7094/api/Course/getVideo/${videoUrl}`);
            // response.data = { ...response.data, videoFile: video.data };
            return video.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const updateNewCourse = createAsyncThunk(
    'courses/updateNewCourse',
    async (course) => {
        console.log(course);
        return course;
    }
)

const getCurrentDateTime = () => {
    // יצירת Date object מהזמן הנוכחי
    const now = new Date();

    // יצירת YYYY-MM-DD
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    // יצירת HH:MM:SS.sss
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0");

    // חיבור כל החלקים
    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    return dateTimeString;
};

export const postCourse = createAsyncThunk(
    'courses/postCourse',
    async (course, thunkAPI) => {
        console.log(course);
        console.log("111");
        try {
            const date = getCurrentDateTime();
            const formData = new FormData();
            formData.append('Name', course.name);
            formData.append('Description', course.description);
            formData.append('DatePublished', date);
            //formData.append('Price_first', course.price_first);
            formData.append('Price_now', course.price_now);
            formData.append('Language', course.language);
            formData.append('Num_chapter', course.num_chapter);
            formData.append('Duration', course.duration);
            formData.append('Picture', "p");
            formData.append('FileImage', course.currentFileImage);
            formData.append('Video', "p");
            formData.append('FileVideo', course.currentFileVideo);
            formData.append('LectureId', course.lectureId)

            course.categories.forEach(element => {
                console.log(element);
                formData.append('CategoriesId', element.id);
            });
            console.log(formData);
            const res = await axios.post("https://localhost:7094/api/Course",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Post created:");
            thunkAPI.dispatch(updateLectureDeatails(res.data))
            console.log(res);
            return res.data
        } catch (error) {
            console.error("Error creating post:", error);
        }
        return {}
    }
);
export const putCourse = createAsyncThunk(
    'putCourse',
    async (course) => {
        try {
            console.log(course);
            const formData = new FormData();
            // if(initialState.editStatus='edit')
            formData.append('Id', course.id);
            formData.append('Name', course.name);
            formData.append('Description', course.description);
            formData.append('DatePublished', '2024-02-28T21:35:07.137Z');
            formData.append('Price_now', course.price_now);
            formData.append('Language', course.language);
            formData.append('Num_chapter', course.num_chapter);
            formData.append('Duration', course.duration);
            console.log(course.imageS);
            if (course.imageS == true) {
                console.log("==========");
                formData.append('Picture', 'pp');
                formData.append('FileImage', course.currentFileImage);
            }
            else
                formData.append('Picture', course.picture);
            if (course.videoS == true) {
                console.log("==========");
                formData.append('Video', 'pp');
                formData.append('FileVideo', course.currentFileVideo);
            }
            else
                formData.append('Video', course.video);
            formData.append('LectureId', 2);
            course.categories.forEach(element => {
                console.log(element);
                formData.append('CategoriesId', element.id);
            });
            const response = await axios.put(`https://localhost:7094/api/Course/${course.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);
export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (id) => {
        try {
            const res = await axios.delete(`https://localhost:7094/api/Course/${id}`);
            console.log("delete:");
            console.log(res);
            return res.data
        } catch (error) {
            console.error("Error creating post:", error);
        }
        return {}
    }
);

export const setCategories = createAsyncThunk(
    'courses/setCategories',
    (thunkAPI) => {
        console.log("in setCategories");
        const categories = thunkAPI.getState().categories.categories; // Access from state
        console.log(categories);
        return categories
    }
);

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setEditStatus: (state, action) => {
            console.log('ee');
            state.editStatus = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.courses = action.payload
        })
        builder.addCase(updateNewCourse.fulfilled, (state, action) => {
            state.newCourse = action.payload;
            state.newCourseStatus = 'fulfilled'
            console.log(state.newCourse);
        })
        builder.addCase(postCourse.fulfilled, (state, action) => {
            console.log("in post");
            state.newCourse = {}
            state.newCourseStatus = 'succesed'
        })
        builder.addCase(putCourse.fulfilled, (state, action) => {
            console.log("in puttt");
            state.editStatus = "add"
            state.newCourse = {}
            state.newCourseStatus = 'succesed'
        })
        builder.addCase(getCourseById.fulfilled, (state, action) => {
            state.selectedCourse = action.payload
            state.selectedStatus = 'fulfilled'
        });
        builder.addCase(getCourseByIdVideo.fulfilled, (state, action) => {
            console.log("in get");
            state.selectedCourse = { ...state.selectedCourse, videoFile: action.payload }
            state.selectedStatus = 'fulfilledVideo'
        });
        builder.addCase(setSelectedCourse.pending, (state, action) => {
            state.selectedStatus = 'pending'
        });
        builder.addCase(setSelectedCourse.fulfilled, (state, action) => {
            state.selectedStatus = 'fulfilled'
            state.selectedCourse = action.payload
            console.log(state.selectedCourse);
        });
        builder.addCase(setCategories.fulfilled, (state, action) => {
            console.log("setCategories");
            console.log(action.payload);
            state.newCourse.categories = []
            state.newCourse.categoriesId.forEach(categoryId => {
                console.log(categoryId);
                action.payload.forEach(category => {
                    if (category.id === categoryId) {
                        console.log(category);
                        state.newCourse.categories.push(category);
                    }
                });
            });
            console.log(state.newCourse);
        });
    },
})


export const { } = courseSlice.actions
export const { setEditStatus } = courseSlice.actions
export default courseSlice.reducer