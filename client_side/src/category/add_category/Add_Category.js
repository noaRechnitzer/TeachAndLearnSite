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
import { postCategory, putCategory } from '../CategorySlice';
import Step_3 from './Step_3';

function Copyright() {

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Add_Category() {
  const [activeStep, setActiveStep] = useState(0);
  const newCategory = useSelector(state => state.categories.newCategory);
  const editStatus = useSelector(state => state.categories.editStatus)
  const dispatch = useDispatch();
  const steps = ['course detailse', 'course files', 'Review your course'];


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Step_1/>;
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
      if (editStatus=='edit') {
        // dispatch(updateNewCourse({...newCourse}))
        console.log(newCategory);
        dispatch(putCategory(newCategory))
      }
      else{
        if (editStatus=='add') {
          dispatch(postCategory(newCategory))
        }
      }
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
          <Typography component="h1" variant="h4" align="center">
            category
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
              <Typography variant="h5" gutterBottom>
                Thank you for your update.
              </Typography>
              <Typography variant="subtitle1">
              Your category has been successfully {editStatus}. To see the update, please refresh the page. 
              </Typography>
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
                  {activeStep === steps.length - 1 ? "Yes I'm sure" : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
