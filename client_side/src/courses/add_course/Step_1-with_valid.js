import React, { useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Grid, InputLabel, TextField, Select, MenuItem, Box } from '@mui/material';
import { updateNewCourse } from '../courseSlice';
import { fetchCategories } from '../../category/CategorySlice';
import { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { email, required } from '../../homePage-onepriate/modules/form/validation';
import { Field, Form, FormSpy } from 'react-final-form';
import AppForm from '../../homePage-onepriate/modules/views/AppForm';
import RFTextField from '../../homePage-onepriate/modules/form/RFTextField';

function Step_1() {
    const newCourse = useSelector(state => state.courses.newCourse)
    const categories = useSelector(state => state.categories.categories)
    const status = useSelector(state => state.categories.status)
    const editStatus = useSelector(state => state.courses.editStatus)
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    function getIso8601Date() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // חודשים מתחילים מ-0 ב-JS
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    }
    const validate = (values) => {
        if (values!={}) {
            // dispatch(updateNewCourse({ ...newCourse,...values }))
        }
        console.log(values);
        const errors = required([ 'description', 'price','namee'], values);
        if (!errors.email) {
            const emailError = email(values.email);
            if (emailError) {
                errors.email = emailError;
            }
        }
        return errors;
    };
    useEffect(() => {
        setFlag(true)
    }, [newCourse])
    useEffect(() => {
        const fun = async () => {
            if (editStatus == 'add') {
                setFlag(true)
            }
            console.log('in useeffect');
            console.log(newCourse);
            const date1 = getIso8601Date();
            // dispatch(updateNewCourse({...newCourse,datePublished:date1}))
            if (status != 'fulfilled')
                await dispatch(fetchCategories())
            console.log(categories);
            // setSelectedOptions(categories[0])
        }
        // fun();
        // setSelectedOptions(categories[0])
        console.log(selectedOptions);
    }, [])

    const handleChange = (event, newSelectedOptions) => {
        console.log(newSelectedOptions);
        console.log(newCourse);
        dispatch(updateNewCourse({ ...newCourse, categorirs: newSelectedOptions }))

        //   // עדכון מצב selectedOptions עם האפשרויות האחרונות שנבחרו
        setSelectedOptions(newSelectedOptions);

    };
    const handleSubmit = async (event) => {
        console.log("ll");
    }
    return (
        <>

            {flag && <Fragment >
                {/* <AppForm> */}
                <Form
                    subscription={{ submitting: true }}
                    onSubmit={handleSubmit}
                    validate={validate}
                >
                    {({ handleSubmit: handleSubmit2, submitting }) => (
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    {/* <Field
                                        autoFocus
                                        component={RFTextField}
                                        // disabled={submitting || sent}
                                        variant="standard"
                                        fullWidth
                                        label="course name"
                                        name="name"
                                        id="name"
                                        required
                                        autoComplete="course name"
                                        defaultValue={newCourse.name}
                                    // onChange={(event) => {
                                    //     dispatch(updateNewCourse({ ...newCourse, name: event.target.value }))
                                    // }}
                                    /> */}
                                    <Field
                                        autoFocus
                                        component={RFTextField}
                                        // disabled={submitting || sent}
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="price"
                                        name="namee"
                                        label="course name"
                                        autoComplete="course price"
                                        defaultValue={newCourse.name}
                                        // onChange={(event) => {
                                        //     dispatch(updateNewCourse({ ...newCourse, price_first: event.target.value }))
                                        // }} 
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        autoFocus
                                        component={RFTextField}
                                        //disabled={submitting || sent}
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="course description"
                                        autoComplete="course description"
                                        defaultValue={newCourse.description}
                                        // onChange={(event) => {
                                        //     dispatch(updateNewCourse({ ...newCourse, description: event.target.value }))
                                        // }}
                                    />
                                </Grid>
                                {/* {status != 'idle' && <>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={categories}
                                            getOptionLabel={(option) => option.name}
                                            getOptionKey={(option) => option.id}
                                            value={selectedOptions} // חיבור המצב לערך הרכיב
                                            onChange={handleChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Multiple values"
                                                    placeholder="Favorites"
                                                />
                                            )}
                                        /> 
                                    </Grid>
                                </>} */}
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        autoFocus
                                        component={RFTextField}
                                        // disabled={submitting || sent}
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="price"
                                        name="price"
                                        label="course price"
                                        autoComplete="course price"
                                        defaultValue={newCourse.price_first}
                                        // onChange={(event) => {
                                        //     dispatch(updateNewCourse({ ...newCourse, price_first: event.target.value }))
                                        // }} 
                                        />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Form>
                {/* </AppForm> */}
            </Fragment>}
            <button onClick={() => console.log(newCourse)}>bbbbb</button>

        </>
    )
}

export default Step_1