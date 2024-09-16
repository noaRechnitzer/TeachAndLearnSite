import React from 'react'
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Category } from '@mui/icons-material';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];
function Step_3() {
  const newCategory = useSelector(state => state.categories.newCategory)
  const newCategoryImage = useSelector(state => state.categories.newCategoryImage)
  const editStatus = useSelector(state => state.categories.editStatus)

  return (
    <React.Fragment>
      <Grid sx={{ height: '30vh' }}>
        <Typography variant="h6" gutterBottom>
          category summary
        </Typography>
        <Typography variant="p" gutterBottom>
        Are you sure you want to {editStatus} this category "{newCategory.name}"?   
        </Typography>

      </Grid>
    </React.Fragment>
  );
}

export default Step_3