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

export default function MyPurchases() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const userDetails = useSelector(state => state.users.userDetails);
  const status = useSelector(state => state.users.userStatus);
  const dispatch = useDispatch();
  function formatDate(dateString) {
    const dateParts = dateString.split('T')[0].split('-');
  
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  }
  return (
    <>
    {status != 'fulfilled' && <CircularProgress color="info" />}
    {status == 'fulfilled' && <Box sx={{  bgcolor: 'background.paper', borderRadius: '5px', overflowY: 'auto', height: '80vh' }}>
    <List sx={{ width: '60vw', maxWidth: 2260, bgcolor: 'background.paper',borderRadius:'5px'}}>

      {userDetails && console.log(userDetails.purchase_history)}
      {userDetails.purchase_history && userDetails.purchase_history.map((item) => (
        <>
        <Button sx={{textTransform: 'lowercase',padding:'0px',width:'100%'}}>
          <ListItem alignItems="flex-start" sx={{width:'100%'}}>
            <ListItemAvatar>
              <Avatar sx={{height:'60px',width: '60px', marginRight: '25px'}} alt="Remy Sharp" src={item.course.picture} />
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
                  </Typography>
                  purchase date: {formatDate(item.startDate)}
                  <br></br>
                  subscription type: 
                  {item.subscriptionsType==6&&<>  forever</>}
                  {item.subscriptionsType==3&&<>  semiannual</>}
                  {item.subscriptionsType==1&&<>  monthly</>}
                  {/* subscription type: {item.subscriptionsType} */}
                </React.Fragment>
              }
            />
          </ListItem>
          </Button>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
    </Box>}</>
  );
}