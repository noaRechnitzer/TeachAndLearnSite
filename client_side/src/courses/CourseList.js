import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CourseCard from './CourseCard';
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from './courseSlice';
import { getCategoryById } from '../category/CategorySlice';
import { useParams } from 'react-router-dom';
import { addViews } from '../users/userSlice11';
import { CircularProgress } from '@mui/material';
import Typography from '../homePage-onepriate/modules/components/Typography';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CourseList() {
  let { id } = useParams();
  // const course = useSelector(state => state.courses.courses)
  // const status = useSelector(state => state.courses.status)
  const category = useSelector(state => state.categories.selectedCategory)
  const status = useSelector(state => state.categories.selectedStatus)
  const viewsPerUserStatus = useSelector(state => state.views.viewsPerUserStatus)
  const dispatch=useDispatch(0)
  let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [addStatus,setAddStatus]=useState(false)
  useEffect(() => {
    if (user != null) {
        if (user.type == 'user') {
          if(addStatus==false)
          setAddStatus(true)
            dispatch(addViews({categoryId:id,userId:user.id}))
        }     
    }

  }, [])
  useEffect(()=>{
    console.log("b");
    if (status=='idle') {
      console.log("y");
       dispatch(getCategoryById(id)) 
    }
  },[])

  return (
    <div style={{backgroundColor:'#d3e2e9'}}>{status != 'fulfilled' && <CircularProgress color="info" />}
    
    {status == 'fulfilled'&&<Box sx={{ flexGrow: 1, margin:'80px'}}>
    <Typography variant="h4" marked="center" align="center" component="h2">
                    {category.description}
                </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent:'center'}}>
        {category.courses && category.courses.map((item, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <CourseCard key={item.id} course={item}/>
          </Grid>
        ))}
      </Grid>
    </Box>}</div>
  );
}