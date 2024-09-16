import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from './courses/courseSlice'
import categoryReducer from './category/CategorySlice'
import lectureReducer from './lecture/LectureSlice';
import userSlice from './users/userSlice11';
import purchaseSlice from './purchase/PurchaseSlice'
import  viewsSlice  from "./Views/ViewsSlice";
export const store=configureStore({
    reducer:{
        courses:coursesReducer,
        categories:categoryReducer,
        lectures:lectureReducer,
        // users:userReducer,
        users: userSlice,
        purchases:purchaseSlice,
        views:viewsSlice
    },
})
