import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {fetchCourses} from "../courses/courseSlice"

const data = [
  {
    src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    channel: 'Don Diablo',
    views: '396k views',
    createdAt: 'a week ago',
  },
  {
    src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
    title: 'Queen - Greatest Hits',
    channel: 'Queen Official',
    views: '40M views',
    createdAt: '3 years ago',
  },
  {
    src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130M views',
    createdAt: '10 months ago',
  },
];

function Media(props) {

  const courses=useSelector(state=>state.courses.categories)
  const status=useSelector(state=>state.courses.status)
  const dispatch=useDispatch();
  useEffect(()=>{
    console.log('in useeffect');
    if(status!='fulfilled')
      dispatch(fetchCourses())
    console.log(courses);
  },[])


  //=== with redux
  // const course=useSelector(state=>state.courses.courses)
  // const status = useSelector(state => state.courses.status);
  // const dispatch=useDispatch();
  // useEffect(() => {
  //   console.log('in useeffect');
  //   if (status == 'idle')
  //     dispatch(fetchCourses())
  //   console.log("==="+course);
  //   console.log(course);
  //   },[]); 
  

  // const [p, setP] = useState([])
  // const [course, setCourse] = useState([])

  // async function fetchCourse() {
  //   console.log("in fech");
  //   await axios.get('https://localhost:7094/api/Course')
  //       .then(response => {
  //           console.log("in axios");
  //           console.log(response.data);
  //           setCourse(response.data)
  //           //return response.data
  //       })
  //       .catch(error => {
  //           console.log(error);
  //       });
  //   console.log("finish fech");
  // }

  // async function fetchP() {
  //   const res=await axios.get('https://localhost:7094/api/Course/getImage/1706652396375.jpg')
  //   setP(res.data)
  //   console.log(res.data);
  // }

  // useEffect(() => {
  //   fetchCourse();
  //   //fetchP();
  //   }, []);

  const { loading = false } = props;
  return (
    <>
    <input type='button' onClick={()=>{console.log(courses)}} value={"dfqwrgerq"}/>
    {courses&&<Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(course.length)) : courses).map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          {item ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={item.title}
              //src={p}
              
               src={item.picture}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.description}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary">
                {item.lecture.firstName} {item.lecture.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`${item.duration} • ${item.datePublished}`}
              </Typography>
              
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>}
    </>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Media loading />
      <Media />
    </Box>
  );
}