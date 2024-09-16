import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PreviewIcon from '@mui/icons-material/Preview';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import {setEditStatus, deleteCategory, fetchCategories, setSelectedCategory, updateNewCategory } from './CategorySlice';


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
function createData(name, calories, fat, carbs, protein, price) {
  return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
          {
              date: '2020-01-05',
              customerId: '11091700',
              amount: 3,
          },
          {
              date: '2020-01-02',
              customerId: 'Anonymous',
              amount: 1,
          },
      ],
  };
}
function Row(props) {
  const { category } = props;
  const [open, setOpen] = React.useState(false);
  const edit="edit"
  const dispatch=useDispatch(0)
  let navigate = useNavigate(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false)};
  return (
      <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' }, height: '20px' }}>
              <TableCell>
                  <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                  >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                  <img src={category.picture} width="100" height="75" />
              </TableCell>
              <TableCell align="left">{category.name}</TableCell>
              <TableCell align="left">{category.description}</TableCell>
              <TableCell align="left">
                  <Box sx={{ height: 120, transform: 'translateZ(0px)', flexGrow: 1 }}>
                      <SpeedDial
                          ariaLabel="SpeedDial controlled open example"
                          sx={{ position: 'absolute', bottom: 16, right: 16 }}
                          icon={<SpeedDialIcon />}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          open={open}
                          direction='left'
                      >
                              <SpeedDialAction
                                  icon={<PreviewIcon />}
                                  tooltipTitle={'view'}
                                  onClick={()=>{
                                      dispatch(setSelectedCategory(category))
                                      handleClose()
                                      navigate('/course_list/'+category.id)                                        
                                  }}
                              />
                              <SpeedDialAction
                                  icon={<DriveFileRenameOutlineIcon />}
                                  tooltipTitle={'edit'}
                                  onClick={()=>{
                                      dispatch(setEditStatus('edit'))
                                      console.log(category);
                                      dispatch(updateNewCategory({...category}))
                                      handleClose()
                                      navigate('update_Category');
                                  }}
                                       
                              />
                              <SpeedDialAction
                                  icon={<DeleteForeverIcon />}
                                  tooltipTitle={'delete'}
                                  onClick={()=>{
                                      dispatch(deleteCategory(category.id))
                                      handleClose()}}
                              />
                      </SpeedDial>
                  </Box>
              </TableCell>
              {/* <TableCell align="left">{category.datePublished}</TableCell> */}
          </TableRow>
      </React.Fragment>
  );
}


export default function Categories_list() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const categories = useSelector(state => state.categories.categories)
  const status = useSelector(state => state.categories.status)
  const dispatch = useDispatch();
  useEffect(() => {
    if (status != 'fulfilled')
      dispatch(fetchCategories());
  }, [])
  return (<>
    <TableContainer component={Paper} sx={{ height: '85vh' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>picture</TableCell>
            <TableCell align="left">name</TableCell>
            <TableCell align="left">description</TableCell>
            <TableCell align="left">                              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories && categories.map((category) => {
            return(
                <Row key={category.id} category={category} />
          )})}
        </TableBody>
      </Table>
    </TableContainer>
        </>
  );
}