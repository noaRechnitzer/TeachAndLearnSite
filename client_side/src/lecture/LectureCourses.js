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
import { fetchLectureById } from './LectureSlice';
import { deleteCourse, fetchCourses, setSelectedCourse, updateNewCourse, setEditStatus ,setCategories} from '../courses/courseSlice';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { fetchCategories } from '../category/CategorySlice';

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

function Row(props) {
  const { course } = props;
  const categories = useSelector(state => state.categories.categories)
  const status = useSelector(state => state.categories.status)
  const [open, setOpen] = React.useState(false);
  const edit="edit"
  const dispatch=useDispatch(0)
  let navigate = useNavigate(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false)};
      function formatDate(dateString) {
        const dateParts = dateString.split('T')[0].split('-');
      
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      }
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
                  <img src={course.picture} width="100" height="75" />
              </TableCell>
              <TableCell align="left">{course.name}</TableCell>
              <TableCell align="left">{course.price_now}</TableCell>
              <TableCell align="left">{formatDate(course.datePublished)}</TableCell>
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
                                      dispatch(setSelectedCourse(course))
                                      handleClose()
                                      navigate('/course_page_Extantion/'+course.id)                                        
                                  }}
                              />
                              <SpeedDialAction
                                  icon={<DriveFileRenameOutlineIcon />}
                                  tooltipTitle={'edit'}
                                  onClick={async ()=>{
                                      await dispatch(setEditStatus('edit'))
                                      console.log(course);
                                      await dispatch(updateNewCourse({...course}))
                                    //   await dispatch(fetchCategories())
                                    //   if(status=='idle'){
                                    //   }
                                      handleClose()
                                      navigate('update_Course')             
                                  }}
                                       
                              />
                              <SpeedDialAction
                                  icon={<DeleteForeverIcon />}
                                  tooltipTitle={'delete'}
                                  onClick={()=>{
                                      dispatch(deleteCourse(course.id))
                                      handleClose()}}
                              />
                      </SpeedDial>
                  </Box>
              </TableCell>
              {/* <TableCell align="left">{course.datePublished}</TableCell> */}
          </TableRow>
      </React.Fragment>
  );
}

export default function LectureCourses() {
  const lecture = useSelector(state => state.lectures.selectedLecture)
  const lectureStatus = useSelector(state => state.lectures.selectedStatus)
  const dispatch = useDispatch(0)
  const courses = useSelector(state => state.courses.courses)
  const status = useSelector(state => state.courses.status)
  console.log(courses);
  console.log(lecture);

  return (<>

    {lectureStatus!='fulfilled'&& <CircularProgress color="info" />}
    {lectureStatus=='fulfilled'&&<TableContainer component={Paper} sx={{ height: '85vh' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>picture</TableCell>
            <TableCell align="left">name</TableCell>
            <TableCell align="left">price</TableCell>
            <TableCell align="left">date published</TableCell>
            <TableCell align="left">                                                           </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lecture.courses && lecture.courses.map((course) => {
            console.log("----"+course);
            return(
                <Row key={course.id} course={course} />
          )})}
        </TableBody>
      </Table>
    </TableContainer>}
  </>

  );
}