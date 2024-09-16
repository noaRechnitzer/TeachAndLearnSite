import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetails } from './userSlice11'
import Button from '../homePage-onepriate/modules/components/Button';
import { Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { setSelectedCourse } from '../courses/courseSlice';

export default function MyCourses() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const userDetails = useSelector(state => state.users.userDetails);
  const status = useSelector(state => state.users.userStatus);
  const dispatch = useDispatch();
  const date = new Date();
  const isoDateString = date.toISOString();
  const isDateBeforeToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    return date > today;
  };

  return (<>
    {status != 'fulfilled' && <CircularProgress color="info" />}
    {status == 'fulfilled' && <Box sx={{ bgcolor: 'background.paper', borderRadius: '5px', overflowY: 'auto', height: '80vh' }}>
      <List sx={{ width: '60vw', maxWidth: 2260, bgcolor: 'background.paper', borderRadius: '5px' }}>
        {userDetails && console.log(userDetails.purchase_history)}
        {status == 'fulfilled' && userDetails.purchase_history.map((item) => (<>
          {item.course && <>
           {console.log(item.course.id)}
            {isDateBeforeToday(item.endDate) && <>
              {/* {!isDateBeforeToday(item.endDate)&&<> */}
              {console.log(item.course.id)}
              {console.log("------")}

              <Link to={'/course_page_Extantion/' + item.course.id}>
                <Button onClick={() => dispatch(setSelectedCourse(item.course))} sx={{ textTransform: 'lowercase', padding: '0px', width: '100%' }}>
                  <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ height: '60px', width: '60px', marginRight: '25px' }} alt="Remy Sharp" src={item.course.picture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.course.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Ali Connors
                          </Typography>
                          {item.course.description}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Button>
              </Link>
              <Divider variant="inset" component="li" />
            </>}
          </>}
        </>)
        )}
      </List>
    </Box>} </>
  );
}