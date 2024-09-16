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
import { useDispatch } from 'react-redux';
import { putUser } from './userSlice11';
// import { postUser } from './UserSlice';

function UpdateUser() {
  const [sent, setSent] = React.useState(false);
  const dispatch=useDispatch(0);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
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
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const user2={
        id:user.id,
        firstName:data.get('firstName'),
        lastName:data.get('lastName'),
        email:data.get('email'),
        password:data.get('password')};
    dispatch(putUser(user2))    
    }

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Update User
          </Typography>
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
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                    defaultValue={user.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                    defaultValue={user.lastName}
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                defaultValue={user.email}
                />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                // type="password"
                margin="normal"
                defaultValue={user.password}
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
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(UpdateUser);
