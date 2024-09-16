import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import './CourseCardStyle.css'
import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import { setSelectedCourse } from './courseSlice';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CourseCard(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch(0);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function formatDate(dateString) {
    const dateParts = dateString.split('T')[0].split('-');
  
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  }
  return (<>
    {/* ,margin:'10px', width:'400px' */}
    <div style={{margin:'20px'}}>
      {/* {console.log(props.course)} */}
      <Card sx={{ maxWidth: 600, height: '470px'}}>
        <CardHeader
        sx={{height:'30px'}}
          avatar={
            <Avatar alt="Remy Sharp"
              // src={props.course.} />
              src={props.course.lecture.picture} />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.course.lecture.firstName + " " + props.course.lecture.lastName}
          subheader={formatDate(props.course.datePublished)}
        />
        <CardMedia
          component="img"
          height="200px"          
          image={props.course.picture}
          //  image='11.jpg'
          alt={props.course.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <div>
              <h3 style={{height:'70px'}}>{props.course.name}</h3>
              {/* <p style={{height:'20px'}}>{props.course.description}</p> */}
              <div className='price_bying'>
                <Link to={'/course_page/' + props.course.id}>
                  <Button className='save_distance' variant="outlined" onClick={async() => await dispatch(setSelectedCourse(props.course))}>bying</Button>
                </Link>
                <Outlet />
                <h4 className='save_distance'>{props.course.price_now} $</h4>
              </div>
            </div>

          </Typography>
        </CardContent>
      </Card>
    </div>
  </>);
}
{/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
{/* </CardContent> */ }
{/* </Collapse> */ }
