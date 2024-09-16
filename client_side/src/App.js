//import Index from "./homePage/Home"
import './App.css'
import YouTube from "./components/YouTube";
import CourseList from "./courses/CourseList";
import CoursePage from "./courses/CoursePage";
import HomePage from "./homePage/homePage.js"
import { Route, Routes } from 'react-router-dom';
import MyAppBar from './homePage/AppBar.js'
import CategoryPage from './category/CatogoryPage.js'
import SignIn from './users/SignIn.js'
import { useState } from 'react';
import LectureList from './lecture/LectureList.js';
import Profile from './users/Profile.js';
import ForgotPassword from './users/ForgotPassword.js';
import SignUp from './users/SignUp.js';
import SignInOld from './homePage/SignIn.js'
import Add_Category from './category/add_category/Add_Category.js'
import Add_Course from './courses/add_course/Add_Course.js';
import Personal_Area_user from './users/Personal_Area_user.js';
import Personal_Area_lecture from './lecture/‏‏Personal_Area_lecture-good.js'
import Personal_Area_admin from './users/Personal_Area_admin.js';
import CoursePageExtantion from './courses/CoursePageExtantion.js';
import LectureCourses from './lecture/LectureCourses.js';
import SignUpLecture from './lecture/SignUpLecture.js';
import MyCourses from './users/MyCourses.js';
import MyPurchases from './users/MyPurchases.js';
import { fetchCourses } from './courses/courseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLectureById } from './lecture/LectureSlice.js';
import { getDetails } from './users/userSlice11.js';
import Categories_list from './category/Categories_list.js';
import { fetchViewsPerUser } from './Views/ViewsSlice.js';
import Questions_Answers from './courses/Questions_Answers.js';
import Questions_and_Answers from './homePage/Questions_and_Answers.js';
function App() {
  const dispatch=useDispatch(0)
  let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  // const viewsPerUserStatus = useSelector(state => state.views.viewsPerUserStatus);

  // const getViewsPerUser = async () => {
  //   await dispatch(fetchViewsPerUser(user.id))
  // }
  // useEffect(() => {
  //   if (user != null) {
  //       if (user.type == 'user') {
  //         if (viewsPerUserStatus != 'fulfilled')
  //         console.log("kkkkkkkkkkkkkkkk");
  //            getViewsPerUser()
  //       }     
  //   }

  // }, [])
  return (<>
    

      <MyAppBar />
      <div style={{height:'85vh'}}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='home_page' element={<HomePage />} />
        <Route path='Questions_and_Answers' element={<Questions_and_Answers />} />
        <Route path='course_list' element={<CourseList />} >
        </Route>
        <Route path='course_page/:id' element={<CoursePage />} />
        <Route path='course_page_Extantion/:id' element={<CoursePageExtantion />} />
        <Route path='category_list' element={<CategoryPage />} />
        <Route path='course_list/:id' element={<CourseList />} />
        <Route path='singIn' element={<SignIn />} />
        {/* <Route path='singIn' element={<SignInOld user={user} setUser={setUser}/>} /> */}
        <Route path='forgot-password/' element={<ForgotPassword /*user={user} setUser={setUser}*/ />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='sign-up-lecture' element={<SignUpLecture />} />
        <Route path='personal-Area-lecture' element={<Personal_Area_lecture />}>
          <Route path='lecture-profile' element={<SignUpLecture />} />
          <Route path='edit-lecture' element={<SignUpLecture />} />
          <Route path='add_Course2' element={<Add_Course />} />
          <Route path='Lecture_Courses' element={<LectureCourses />} />
          <Route path='Lecture_Courses/update_Course' element={<Add_Course />} />
        </Route>
        <Route path='personal-Area-user' element={<Personal_Area_user />}>
          <Route path='user-profile' element={<SignUp />} />
          <Route path='edit-user' element={<SignUp />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='my-purchases' element={<MyPurchases />} />
        </Route>
        <Route path='personal-Area-admin' element={<Personal_Area_admin />} >
          <Route path='add_Category' element={<Add_Category />} />
          <Route path='categories-list' element={<Categories_list />} />
          <Route path='categories-list/update_Category' element={<Add_Category />} />
        </Route>
        {/* <Route path='profile' element={<Profile user={user} setUser={setUser}/>} /> */}
        <Route path='add_course' element={<Add_Course />} />
        <Route path='add_category' element={<Add_Category />} />
        <Route path='lectures' element={<LectureList />} />
        {/* <Route path='Lecture_Courses' element={<LectureCourses />} /> */}

      </Routes>

      {/* <YouTube></YouTube> */}
      {/* <CoursePage></CoursePage> */}
      {/* <CourseList></CourseList> */}
    </div></>


  );
}

export default App;
