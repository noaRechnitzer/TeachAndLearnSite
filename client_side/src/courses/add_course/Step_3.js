import React from 'react'
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];
function Step_3() {
  const newCourse = useSelector(state => state.courses.newCourse)
  const editStatus = useSelector(state => state.courses.editStatus)

  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
      course summary
    </Typography>
    <Typography variant="p" gutterBottom>
    Are you sure you want to {editStatus} this course "{newCourse.name}"?    
    </Typography>
    </React.Fragment>
  );
}

export default Step_3