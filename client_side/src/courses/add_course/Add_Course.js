import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addCourses } from '../courseSlice';
import { useRef } from 'react';
import axios from 'axios'
import Step_1 from './Step_1';
import Step_2 from './Step_2';
import Step_3 from './Step_3';
import { postCourse, putCourse, updateNewCourse } from '../courseSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Add_Course() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['course detailse', 'course files', 'Review your course'];
  const newCourse = useSelector(state => state.courses.newCourse)
  const newCourseStatus = useSelector(state => state.courses.newCourseStatus)
  const editStatus = useSelector(state => state.courses.editStatus)
  let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fun = async () => {
      const video = await axios.get(`https://localhost:7094/api/Course/getVideo/${newCourse.video}`);
      await dispatch(updateNewCourse({ ...newCourse, fileVideo: video.data }))
    }
    if (editStatus == 'edit') {
      if (newCourseStatus == 'fulfilled')
        fun()
    }
  }, [newCourse.video])
  useEffect(() => {
    if(newCourseStatus=='succesed')
      //navigate('/')
      setActiveStep(activeStep + 1);
  }, [newCourseStatus])
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Step_1 />;
      case 1:
        return <Step_2 />;
      case 2:
        return <Step_3 />;
      default:
        throw new Error('Unknown step');
    }
  }


  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      //validate
      console.log(newCourse);
      let str = "the filed: "
      if (newCourse.name == '') {
        str += 'name '
      }
      if (newCourse.description == '') {
        str += 'description, '
      }
      if (newCourse.categories.length == 0) {
        str += 'categorirs, '
      }
      if (newCourse.price_now == 0) {
        str += 'price_first, '
      }
      if (newCourse.imageS == false) {
        str += 'image, '
      }
      if (newCourse.videoS == false) {
        str += 'video, '
      }
      if (str != "the filed: ") {
        str += 'require'
        alert(str)
        setActiveStep(activeStep - 2);
      }
      else {
        console.log(editStatus);
        console.log(newCourse);
        if (editStatus == 'edit') {
          // dispatch(updateNewCourse({...newCourse}))
          console.log(newCourse);
          dispatch(putCourse(newCourse))
        }
        else {
          if (editStatus == 'add') {
            // await dispatch(updateNewCourse({...newCourse,price_now:"1",language:"1",num_chapter:"1",duration:"1",lectureId:""+(user.id)}))
            console.log(newCourse);
            dispatch(postCourse(newCourse))
            //navigate('/')
           // setActiveStep(activeStep + 1);
          }
        }
      }
    }
    else{
    if (activeStep === steps.length - 2) {
      dispatch(updateNewCourse({ ...newCourse, language: "1", num_chapter: "1", duration: "1", lectureId: "" + (user.id) }))
      setActiveStep(activeStep + 1);
    }
   else{
    setActiveStep(activeStep + 1);
  }}
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {editStatus == 'edit' && <>Update Course</>}
            {editStatus == 'add' && <>Add Course</>}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="subtitle1">
              Your course has been successfully {editStatus}. To see the update, please refresh the page.              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Yes I'm sure" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
