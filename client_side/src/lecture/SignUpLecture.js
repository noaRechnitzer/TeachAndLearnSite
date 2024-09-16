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
import { CircularProgress } from '@mui/material';
import { Button} from '@mui/material';
import { postLecture, putLecture, setEditStatusLecture } from './LectureSlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function SignUpLecture() {
  const [sent, setSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [image, setImage] = useState(false);
  const [imageS, setImageS] = useState(false);
  const status = useSelector(state => state.lectures.editStatus)
  const selectedLecture = useSelector(state => state.lectures.selectedLecture)
  const selectedStatus = useSelector(state => state.lectures.selectedStatus)
  const location = useLocation();
  const dispatch = useDispatch(0);
  const navigate=useNavigate(0)
  useEffect(() => {
    if (location.pathname=='/personal-Area-lecture/lecture-profile') {
      dispatch(setEditStatusLecture('show'))
    }
    else
    if (location.pathname=='/personal-Area-lecture/edit-lecture') {
      dispatch(setEditStatusLecture('edit'))

    }
  }, [])
  useEffect(() => {
    if (status == 'show') {
      setShow(true)
    }
  }, [status])
  useEffect(() => {
    if (selectedLecture.picture) {
      setSelectedImage(selectedLecture.picture)
      setImage(selectedLecture.picture)
    }
  }, [selectedLecture.picture])
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageS(true)
    console.log(status);
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    const formData = new FormData();
    formData.append('Image', selectedFile);
    setFile(formData);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    // setSent(true);
    if (status == 'edit') {
      setImage(null)
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const user = {
      id:selectedLecture.id,
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      description: data.get('description'),
      email: data.get('email'),
      password: data.get('password'),
      picture: selectedLecture.picture,
      currentFileImage: image,
      imageS: imageS
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
    if (status == 'add')
      dispatch(postLecture(user))
    else
      dispatch(putLecture(user))
    navigate('/personal-Area-lecture')}
    else{alert(str)}
  };

  return (
    <div >
    {selectedStatus!='fulfilled'&& <CircularProgress color="secondary" />}

    {true&& <React.Fragment> 
      <AppForm> 
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            {status == 'edit' && <>Update</>}
            {status == 'add' && <>Sign Up</>}
            {status == 'show' && <>my profile</>}
            {/* {edit&&<>Update</>}
           {add&&<>Sign Up</>} */}
          </Typography>
          {status=='add'&&<>{status=='add'&&<Typography variant="body2" align="center">
            <Link href="/singIn/" underline="always">
              Already have an account?
            </Link>
          </Typography>}</>}
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
                    defaultValue={selectedLecture.firstName}
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
                    defaultValue={selectedLecture.lastName}
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="description"
                component={RFTextField}
                // disabled={submitting || sent}
                disabled={show}
                fullWidth
                label="Description"
                // margin="normal"
                name="description"
                required
                defaultValue={selectedLecture.description}
              
              />
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
                defaultValue={selectedLecture.email}
              />
              {status == 'add'&&<Field
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
                defaultValue={selectedLecture.password}
              />}
              {!show&&<><Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onChange={handleImageUpload}
              >
                change image
                <VisuallyHiddenInput type="file" />
              </Button>
              {!(status=='add') && (
                <img src={image} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
              )}
              <div>
                {/* {selectedLecture.pictureFile && <img src={selectedLecture.pictureFile} alt="תמונה" style={{ maxWidth: '200px', marginTop: '10px' }} />} */}
              </div>
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
                {submitting || sent ? 'In progress…' : status == 'edit' ? 'save changes' : 'Sign Up'}
              </FormButton></>}
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>}</div>
  );
}

export default withRoot(SignUpLecture);
