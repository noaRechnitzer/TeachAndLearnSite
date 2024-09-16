import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../homePage-onepriate/modules/components/Typography';
import AppFooter from '../homePage-onepriate/modules/views/AppFooter';
import AppAppBar from '../homePage-onepriate/modules/views/AppAppBar';
import AppForm from '../homePage-onepriate/modules/views/AppForm';
import { email, required } from '../homePage-onepriate/modules/form/validation';
import RFTextField from '../homePage-onepriate/modules/form/RFTextField';
import FormButton from '../homePage-onepriate/modules/form/FormButton';
import FormFeedback from '../homePage-onepriate/modules/form/FormFeedback';
import withRoot from '../homePage-onepriate/modules/withRoot';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser, getDetails, signIn } from './userSlice11'
import { fetchLectureById } from '../lecture/LectureSlice';

function SignIn() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch(0);
  const userL = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };
  React.useEffect(() => { 
    console.log(":=======+====");
    console.log(localStorage.getItem('user'));
  }, [localStorage.getItem('user')])
  const handleSubmit = () => {
    setSent(true);
  };
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    console.log("111");
    // setSent(true);
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const user = {
      email: data.get('email'),
      password: data.get('password')
    }
    if (user.email == 'teach.learen.admin@gmail.com' && user.password == 'admin') {
      localStorage.setItem('user', JSON.stringify({ email: user.email, password: user.password, id: 0, type: 'admin' }));
      navigate('/personal-Area-admin')
    }
    else {
      await dispatch(signIn(user))
      let u = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
      // console.log(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null);
      // console.log((localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null).id);
      console.log(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
      console.log(userL);
      if (u != null) {
        if (u.type == 'user') {
          dispatch(getDetails(u.id))
          navigate('/personal-Area-user')
        }
        else {
          if (u.type == 'lecture') {
            console.log('sign lectyure');
            dispatch(fetchLectureById(u.id))
            navigate('/personal-Area-lecture')
          }
        }
      }
    }

  };

  return (
    <React.Fragment
    >
      <AppForm>
        {/* <div style={{backgroundColor:'rgb(230 209 202)'}}> */}
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link
              href="/sign-up/"
              align="center"
              underline="always"
            >
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit1}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit1} noValidate sx={{ mt: 6 }}>
              <Grid item xs={12} sm={6} sx={{ backgroundColor: '#eeddd7w' }}>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  size="large"
                />
              </Grid>
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
        {/* </div> */}
      </AppForm>

    </React.Fragment>
  );
}

export default withRoot(SignIn);
