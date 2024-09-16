import * as React from 'react';
import Box from '@mui/material/Box';
import ChapterDrawer from '../chapter/ChapterDrawer';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, GlobalStyles, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCourseById } from './courseSlice';
import Questions_Answers from './Questions_Answers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { postPurchase } from '../purchase/PurchaseSlice'
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Container from '@mui/material/Container';

const tiers = [
  {
    title: 'monthly',
    price: '0',
    description: ['By purchasing this subscription, this course will be available to you for one month from the current date',],
    buttonText: 'I want it!',
    buttonVariant: 'outlined',
    subscriptionsType:1
  },
  {
    title: 'Semiannual',
    subheader: 'Most popular',
    price: '15',
    description: ['By purchasing this subscription, this course will be available to you for six months from the current date',],
    buttonText: 'I want it!',
    buttonVariant: 'contained',
    subscriptionsType:3
  },
  {
    title: 'For life',
    price: '30',
    description: ['By purchasing this subscription, this course will be available to you for life!',],
    buttonText: 'I want it!',
    buttonVariant: 'outlined',
    subscriptionsType:6
  },
];

function CoursePage() {
  let { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [subscriptionsType, setSubscriptionsType] = React.useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const course = useSelector(state => state.courses.selectedCourse)
  const status = useSelector(state => state.courses.selectedStatus)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("b");
    if (status == 'idle') {
      console.log("y");
      dispatch(getCourseById(id))
    }
  }, [])
  const handleClickOpen = (SubscriptionsType) => {
    setSubscriptionsType(SubscriptionsType)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const agree = () => {
    setOpen(false);
    let purchase = {
      id: 0,
      subscriptionsType: subscriptionsType,
      sum: course.price_now*subscriptionsType,
      startDate: "2024-03-03T21:12:56.884Z",
      endDate: "2024-03-03T21:12:56.884Z",
      userId: user.id,
      courseId: id
    }
    // purchase={...purchase,subscriptionsType:subscriptionsType}
    dispatch(postPurchase(purchase))
    navigate('/category_list/')
  };

  return (
    <>
    {status != 'fulfilled' && <div style={{display: 'flex', alignItems: 'center',width:'100vw',height:'85vh'}}><CircularProgress color="info" /></div>}
      {status == 'fulfilled' &&<React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', minHeight: '90vh', backgroundImage: 'url(/appCurvyLines.png)', backgroundRepeat: 'repeat',backgroundColor:"#d3e2e9" }}>
          {course && <>
            <Typography sx={{ fontFamily: 'Roboto', margin: '10px' ,marginTop:'90px' }} variant="h3">{course.name}</Typography>
            <Typography sx={{ fontFamily: 'Roboto', margin: '30px' }} variant="p">{course.description}</Typography>
            <img style={{ width: '50vw' }} src={course.picture} />
            {course.videoFile && <video controls>
              <source src={course.videoFile} type="video/mp4" />
            </video>}
          </>}
          <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Pricing
              </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
              <Grid container spacing={5} alignItems="flex-end">
                {tiers.map((tier) => (
                  // Enterprise card is full width at sm breakpoint
                  <Grid
                    item
                    key={tier.title}
                    xs={12}
                    sm={tier.title === 'Enterprise' ? 12 : 6}
                    md={4}
                  >
                    <Card>
                      <CardHeader
                        title={tier.title}
                        subheader={tier.subheader}
                        titleTypographyProps={{ align: 'center' }}
                        action={tier.title === 'Pro' ? <StarIcon /> : null}
                        subheaderTypographyProps={{
                          align: 'center',
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? theme.palette.grey[200]
                              : theme.palette.grey[700],
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                          }}
                        >
                          <Typography component="h2" variant="h3" color="text.primary">
                            ${course.price_now*tier.subscriptionsType}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            /mo
                          </Typography>
                        </Box>
                        <ul>
                          {tier.description.map((line) => (
                            <Typography
                              component="li"
                              variant="subtitle1"
                              align="center"
                              key={line}
                            >
                              {line}
                            </Typography>
                          ))}
                        </ul>
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant={tier.buttonVariant} onClick={()=>handleClickOpen(tier.subscriptionsType)}>
                          {tier.buttonText}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {user && "Are you sure you want to purchase the course?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {!user && <p>coxnect to continue</p>}
                {user.type=='lecture' && <p>coxnect to continue</p>}
                {user.type=='user' && <p>An email with the purchase details will be sent to you in the next few minutes.</p>}
              </DialogContentText>
            </DialogContent>
            {user && <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={agree} autoFocus>
                Agree
              </Button>
            </DialogActions>}
          </Dialog>
          <div style={{margin:'80px'}}>
          <Questions_Answers /></div>
        </Box>
      </React.Fragment>}
  </>
  );
}
export default CoursePage;