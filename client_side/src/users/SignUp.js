import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../homePage-onepriate/modules/components/Typography';
import AppFooter from '../homePage-onepriate/modules/views/AppFooter';
import AppAppBar from '../homePage-onepriate/modules/views/AppAppBar';
import AppForm from '../homePage-onepriate/modules/views/AppForm';
import { email, required } from '../homePage-onepriate/modules/form/validation';
import RFTextField from '../homePage-onepriate/modules/form/RFTextField';
import FormButton from '../homePage-onepriate/modules/form/FormButton';
import FormFeedback from '../homePage-onepriate/modules/form/FormFeedback';
import withRoot from '../homePage-onepriate/modules/withRoot';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { postUser, putUser, setEditStatus } from './userSlice11';
import { useState } from 'react';
import { useEffect } from 'react';
import { CircularProgress, Snackbar } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setEditStatusLecture } from '../lecture/LectureSlice';

function SignUp() {
  const location = useLocation();
  const [sent, setSent] = React.useState(false);
  const dispatch = useDispatch(0);
  const navigate = useNavigate();
  const status = useSelector(state => state.users.editStatus)
  const selectedUser = useSelector(state => state.users.userDetails)
  const userStatus = useSelector(state => state.users.userStatus)
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(false)
  };

  useEffect(() => {
    setOpen(false)
    if (location.pathname == '/personal-Area-user/user-profile') {
      dispatch(setEditStatus('show'))
    }
    else
      if (location.pathname == '/personal-Area-user/edit-user') {
        dispatch(setEditStatus('edit'))
      }
  }, [])
  useEffect(() => {
    if (status == 'show') {
      setShow(true)
    }
  }, [status])

  const validate = (values) => {
    const errors = required(['firstName', 'lastName', 'email', 'password'], values);
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    // setSent(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      id: selectedUser.id,
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    };
    let str="the filed are required: "
    if (user.firstName=='') {
      str+="first name "
    }
    if (user.lastName=='') {
      str+="last name "
    }
    if (user.email=='') {
      str+="email "
    }
    if (status == 'add'&&user.password=='') {
      str+="password"
    }
    if(str=="the filed are required: "){
    try {
      if (status == 'add'){
        dispatch(postUser(user))
        navigate('/personal-Area-user')
    }
      else
        if (status == 'edit'){
          await dispatch(putUser(user))
          navigate('/personal-Area-user')}
      console.log(open);
      setOpen(szddxfcg)
      console.log(open);
    } catch (error) {
      console.log(error);
    }}
    else{
      alert(str)
    }

  };

  return (
    <div style={{ marginTop: '0vh' }}>
      {true && <React.Fragment>
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              {status == 'edit' && <>Update</>}
              {status == 'add' && <>Sign Up</>}
              {status == 'show' && <>my profile</>}
            </Typography>
            {status == 'add' && <><Typography variant="body2" align="center">
              <Link href="/singIn/" underline="always">
                Already have an account?
              </Link>
            </Typography>
              <div onClick={() => { dispatch(setEditStatusLecture('add'))
                                    navigate('/sign-up-lecture/') }}>
                <Typography variant="body2" align="center">
                  <Link underline="always">
                    Joining the community of lecturers
                  </Link>
                </Typography></div></>}
          </React.Fragment>
          <Form
            onSubmit={handleSubmit}
            subscription={{ submitting: true }}
            validate={validate}
          >
            {({ handleSubmit: handleSubmit2, submitting }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} >
                    <Field
                      autoFocus
                      component={RFTextField}
                      // disabled={submitting || sent}
                      disabled={show}
                      autoComplete="given-name"
                      fullWidth
                      label="First name"
                      name="firstName"
                      required
                      defaultValue={selectedUser.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={RFTextField}
                      // disabled={submitting || sent}
                      disabled={show}
                      autoComplete="family-name"
                      fullWidth
                      label="Last name"
                      name="lastName"
                      required
                      defaultValue={selectedUser.lastName}
                    />
                  </Grid>
                </Grid>
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  // disabled={submitting || sent}
                  disabled={show}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  defaultValue={selectedUser.email}
                />
                <Field
                  fullWidth
                  component={RFTextField}
                  // disabled={submitting || sent}
                  disabled={show}
                  required
                  name="password"
                  autoComplete="new-password"
                  label="Password"
                  type="password"
                  margin="normal"
                  defaultValue={selectedUser.password}
                />
                {!show && <><FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback error sx={{ mt: 2 }}>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                  <FormButton
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={submitting || sent}
                    color="secondary"
                    fullWidth
                  >
                    {submitting || sent ? 'In progress…' : status == 'edit' ? 'save changes' : 'Sign Up'}
                  </FormButton></>}
              </Box>
            )}
          </Form>
        </AppForm>
      </React.Fragment>}
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={'top' + 'center'}
        /></Box></div>
  );
}

export default withRoot(SignUp);
