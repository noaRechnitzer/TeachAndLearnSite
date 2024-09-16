import { Try } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    categories: [],
    status: 'idle',
    selectedCategory: {},
    selectedStatus: 'idle',
    newCategory: {
        name: '',
        description: '',
        picture: 'x',
        //   fileImage:null
    },
    editStatus: 'add'

}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (thunkAPI) => {
        console.log('in fetchCourses');
        const response = await axios.get('https://localhost:7094/api/Category')
        console.log(response.data);
        let c = response.data;
        // //מעבר על כל הקטגוריות
        // for (let i = 0; i < c.length; i++) {
        //     //מביא את התמונה של הקטגורייה עצמה
        //     const picture = await axios.get(`https://localhost:7094/api/Category/getImage/${c[i].picture}`);
        //     c[i] = { ...c[i], FileImage: picture.data };
        //     let category = c[i]
        // }
        return response.data
    }
)

export const getCategoryById = createAsyncThunk(
    'categories/getCategoryById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`https://localhost:7094/api/Category/${id}`)
            let c = response.data
            // for (let i = 0; i < c.courses.length; i++) {
            //     try {
            //         console.log(c.courses[i].picture);
            //         const picture = await axios.get(`https://localhost:7094/api/Course/getImage/${c.courses[i].picture}`);
            //         c.courses[i] = { ...c.courses[i], FileImage: picture.data };
            //     } catch (error) {
            //         console.log(error);
            //     }
            // }
            return c
        } catch (error) {
            console.log(error);
        }
    }
)


export const setSelectedCategory = createAsyncThunk(
    'categories/setSelectedCategory',
    async (category) => {
        console.log("====");
        console.log(category);
        let category2 = {}
        try {
            const updatedCourses = [];
            let c = category.courses;
            for (let i = 0; i < c.length; i++) {
                // const picture = await axios.get(`https://localhost:7094/api/Course/getImage/${c[i].picture}`);
                updatedCourses.push({ ...c[i]/*, FileImage: picture.data*/ })
            }
            category2 = { ...category, courses: updatedCourses }
        } catch (error) {
            console.log(error);
        }
        return category2;
    }
)

export const updateNewCategory = createAsyncThunk(
    'categories/updateNewCategory',
    async (c) => {
        console.log("in re");
        return c;
    }
)

export const postCategory = createAsyncThunk(
    'categories/postCategory',
    async (category) => {
        console.log(category);
        try {
            const formData = new FormData();
            formData.append('Name', category.name);
            formData.append('Description', category.description);
            formData.append('Picture', "xx");
            formData.append('FileImage', category.fileImage);
            console.log(category.fileImage);
            console.log(formData);
            const res = await axios.post("https://localhost:7094/api/Category",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Post created:");
            console.log(res);
            return res.data
        } catch (error) {
            console.error("Error creating post:", error);
        }
        return {}
    }
);

export const putCategory = createAsyncThunk(
    'putCategory',
    async (category) => {
        try {
            console.log(category);
            const formData = new FormData();
            formData.append('Id', category.id);
            formData.append('Name', category.name);
            formData.append('Description', category.description);
            //אם היה שינוי בתמונה
            if (category.imageS==true) {
                console.log("==========");
                formData.append('Picture', 'pp');
                formData.append('FileImage', category.currentFileImage);
            }
            else
                formData.append('Picture', category.picture);
            formData.append('LectureId',2);
            formData.append('CategoriesId', 3);
            const response = await axios.put(`https://localhost:7094/api/Category/${category.id}`, formData, {
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
export const deleteCategory = createAsyncThunk(
    'courses/deleteCategory',
    async (id) => {
        try {
            const res = await axios.delete(`https://localhost:7094/api/Category/${id}`);
            console.log("delete:");
            console.log(res);
            return res.data
        } catch (error) {
            console.error("Error creating delete:", error);
        }
        return {}
    }
);



export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setEditStatus: (state, action) => {
            console.log('ee');
            state.editStatus = action.payload
        },
        updateCourseOfCategories: (state, action) => {
            console.log(action.payload);
            const new_course=action.payload
            console.log('ee');
            //pass of all course categories
            for (let i = 0; i <new_course.categoriesId.length; i++) {
                console.log("=================");
                console.log(new_course.categoriesId[i]);
                for (let j = 0; j < state.categories.length; j++) {
                    // if its connect to the new course
                    console.log(state.categories[j]);
                    if (state.categories[j].id===new_course.categoriesId[i]) {
                        state.categories[j].courses.push(new_course)
                    }
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.status = 'fulfilled'
        })
        builder.addCase(getCategoryById.fulfilled, (state, action) => {
            state.selectedStatus = 'fulfilled'
            state.selectedCategory = action.payload;
        })
        builder.addCase(setSelectedCategory.fulfilled, (state, action) => {
            console.log("in case");
            state.selectedStatus = 'fulfilled'
            state.selectedCategory = action.payload;
        })
        builder.addCase(updateNewCategory.fulfilled, (state, action) => {
            console.log("in case");
            state.newCategory = action.payload;
            console.log(state.newCategory);
        })
        builder.addCase(postCategory.fulfilled, (state, action) => {
            console.log("in post");
            state.categories.push(action.payload)
            state.newCategory = {}
        })
        builder.addCase(putCategory.fulfilled, (state, action) => {
            console.log("in putCategory");
            state.newCategory = {}
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            console.log("in deleteCategory");
            state.newCategory = {}
        })
    },
})
export const { } = categorySlice.actions
export const {setEditStatus,updateCourseOfCategories} = categorySlice.actions
export default categorySlice.reducer