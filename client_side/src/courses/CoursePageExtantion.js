import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ChapterDrawer from '../chapter/ChapterDrawer';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';
import AccordionChapter from '../chapter/AccordionChapter';
import ChapterList from '../chapter/ChapterList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCourseById, getCourseByIdVideo } from './courseSlice';
import Questions_Answers from './Questions_Answers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { postPurchase } from '../purchase/PurchaseSlice'
import axios from 'axios'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

function CoursePageExtantion() {
  let { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [video, setVideo] = React.useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  let course = useSelector(state => state.courses.selectedCourse)
  const status = useSelector(state => state.courses.selectedStatus)
  const dispatch = useDispatch();
  let courseVideo
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const agree = () => {
    setOpen(false);
    dispatch(postPurchase({
      id: 0,
      subscriptionsType: 1,
      sum: 300,
      startDate: "2024-03-03T21:12:56.884Z",
      endDate: "2024-03-03T21:12:56.884Z",
      userId: 2,
      courseId: 16
    }))
  };
  const fun = async () => {
    console.log(course);
    try {
      if (course != 'undefined') {
        console.log(course.video);
        const video = await axios.get(`https://localhost:7094/api/Course/getVideo/${course.video}`);
        console.log(video.data);
        course = { ...course, fileVideo: video.data }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fun1 = async () => {
    const video = await axios.get(`https://localhost:7094/api/Course/getVideo/${course.video}`);
    setVideo(video.data)
  }
  useEffect(() => {
    console.log("b");
    if (status == 'idle') {
      console.log("y");
      dispatch(getCourseById(id))
    }
  }, [])
  useEffect(() => {
    if (course != {}) {
      if (course.video != undefined) {
        fun1()
      }
      console.log(course);
    }
  }, [course])

  return (
    <>
      {status != 'fulfilled' && <CircularProgress color="info" />}

      {status == 'fulfilled' && <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', height: '100vh', backgroundImage: 'url(/appCurvyLines.png)', backgroundRepeat: 'no-repeat' ,backgroundColor:'#d3e2e9'}}>
          {course && <>
            <Typography sx={{ fontFamily: 'Roboto', margin: '10px' }} variant="h3">{course.name}</Typography>
            <Typography sx={{ fontFamily: 'Roboto', margin: '30px' }} variant="p">{course.description}</Typography>
            {/* <img style={{ width: '50vw' }} src={course.picture} /> */}
            <div >{video && <video controls style={{ width: '60vw' }}>
              <source src={video} type="video/mp4" />
            </video>}</div>
            {console.log(course.videoFile)}
          </>}
          <div style={{margin:'60px'}}>
          <Questions_Answers /></div>
        </Box>
      </React.Fragment>}
    </>
  );
}
export default CoursePageExtantion;