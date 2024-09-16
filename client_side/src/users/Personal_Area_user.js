import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Add_Category from '../category/add_category/Add_Category'
import Add_Course from '../courses/add_course/Add_Course'
import MyCourses from './MyCourses';
import MyPurchases from './MyPurchases';
import SignUp from './SignUp';
import UpdateUser from './UpdateUser';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, setEditStatus } from './userSlice11';
import { useEffect } from 'react';

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

export default function Personal_Area_user() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate(0)
    const dispatch = useDispatch(0)
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const userDetails = useSelector(state => state.users.userDetails);
    const userStatus = useSelector(state => state.users.userStatus);
    const getUser = async () => {
        await dispatch(getDetails(user.id))
    }
    // useEffect(() => {
    //     if (userStatus != 'fulfilled')
    //     {
    //         dispatch(updateUserCOurse())
    //     }     
    // }, [userStatus])
useEffect(() => {
    console.log('in effect');
    if (user != null) {
        if (user.type == 'user') {
            if (userStatus != 'fulfilled')
                getUser()
        }
    }

}, [])
const handleChange = (event, newValue) => {
    setValue(newValue);
};

return (
    <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex',backgroundColor: '#d3e2e9' ,backgroundRepeat:'repeat'}}
    >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider'/*,backgroundColor:'white'*/, width: '15vw' }}
        >
            <Tab label="my profile" {...a11yProps(0)} sx={{ marginTop: '70px' }} onClick={() => {
                dispatch(setEditStatus('show'))
                navigate('user-profile');
            }} />
            <Tab label="edit profile" {...a11yProps(1)} onClick={() => {
                dispatch(setEditStatus('edit'))
                navigate('edit-user');
            }} />
            <Tab label="my courses" {...a11yProps(2)} onClick={() => {
                navigate('my-courses')
            }} />
            <Tab label="my purchases" {...a11yProps(3)} onClick={() => {
                navigate('my-purchases')
            }} />
        </Tabs>
        <div style={{ display: 'flex', width: '80vw', alignItems: 'center', justifyContent: 'center' }}>
            <TabPanel value={value} index={0} >
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
        </div>
    </Box>
);
}
