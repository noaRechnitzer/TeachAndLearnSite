import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLectureById, setEditStatusLecture } from './LectureSlice';
import {  fetchCourses, updateNewCourse ,setEditStatus} from '../courses/courseSlice';
import { Outlet, Route, useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
// table


export default function Personal_Area_lecture() {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch(0)
    let navigate = useNavigate();
    const statusCourse = useSelector(state => state.courses.status)
    const courses = useSelector(state => state.courses.courses)
    const lectureStatus = useSelector(state => state.lectures.selectedStatus)
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const getLecture = async () => {
      await dispatch(fetchLectureById(user.id))
    }
    const getCourse = async () => {
        await dispatch(fetchCourses());
    }
    useEffect(() => {
      console.log('in effect');
      if (user != null) {
        // if (statusCourse == 'fulfilled') {
          if (user.type == 'lecture') {
            if (lectureStatus != 'fulfilled')
                getLecture()
          }
        //}
      }
  
    }, [courses])
    // useEffect(() => {

    //   if (user.type == 'lecture') {
    //     if (statusCourse != 'fulfilled') {
    //       //מביא את רשימת כל הקורסים
    //       getCourse()
    //     }
    //   }
    // }, [])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', backgroundColor: '#d3e2e9' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', backgroundColor: 'white', width: '15vw' ,minHeight:'85vh'}}
            >
                <Tab label="my profile" {...a11yProps(0)} sx={{ marginTop: '70px' }} onClick={() => {
                    dispatch(setEditStatusLecture('show'))
                    navigate('lecture-profile');
                }} />
                <Tab label="edit profile" {...a11yProps(1)} onClick={() => {
                    dispatch(setEditStatusLecture('edit'))
                    navigate('edit-lecture')
                }} />
                <Tab label="add course" {...a11yProps(2)} onClick={async() => {
                    await dispatch(setEditStatus('add'))
                    await dispatch(updateNewCourse({}))
                    navigate('add_Course2');
                }} />
                <Tab label="my courses" {...a11yProps(3)} onClick={() => {
                    // getLectureCourse()
                    navigate('Lecture_Courses')
                }} />
            </Tabs>
            <div style={{ display: 'flex', width: '80vw', alignItems: 'center', justifyContent: 'center' }}>

                <TabPanel value={value} index={0} sx={{ width: '80vw' }}>
                    <Outlet />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Outlet />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Outlet />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Outlet />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Outlet />
                </TabPanel>
            </div>
        </Box>
    );
}
