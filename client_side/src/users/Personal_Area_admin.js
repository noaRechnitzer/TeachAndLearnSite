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

export default function Personal_Area_admin() {
    const [value, setValue] = React.useState(0);
    const navigate=useNavigate(0)
    const dispatch=useDispatch(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '90vh', backgroundColor: '#d3e2e9' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider'/*,backgroundColor:'white'*/, width: '15vw' }}
            >

                <Tab label="add category" {...a11yProps(1)} onClick={() => {
                    navigate('add_Category')
                }} />
                <Tab label="category list" {...a11yProps(2)} onClick={()=>{
                    navigate('categories-list')
                }}/>
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
