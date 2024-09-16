import React, { useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Grid, InputLabel, TextField, Select, MenuItem, Box } from '@mui/material';
import { updateNewCourse } from '../courseSlice';
import { fetchCategories } from '../../category/CategorySlice';
import { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Field, Form, FormSpy } from 'react-final-form';
import CircularProgress from '@mui/material/CircularProgress';


function Step_1() {
    const newCourse = useSelector(state => state.courses.newCourse)
    const newCourseStatus = useSelector(state => state.courses.newCourseStatus)
    const categories = useSelector(state => state.categories.categories)
    const status = useSelector(state => state.categories.staus)
    const editStatus = useSelector(state => state.courses.editStatus)
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false)
    const [first, setFirst] = useState(false)
    const [ready, setReady] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const lectureStatus = useSelector(state => state.lectures.selectedStatus)
    const initial = []
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
    useEffect(() => {
        if (status == 'fulfilled') {
            setFlag(true)
        }
    }, [])
    useEffect(() => {
        if (status == 'fulfilled') {
            setFlag(true)
        }
    }, [categories])
    useEffect(() => {
        if (newCourseStatus != 'idle') {
            setSelectedOptions(newCourse.categories)
            console.log(selectedOptions);
            setFlag(true)
        }
    }, [])
    useEffect(() => {
        if (newCourseStatus != 'idle') {
            setSelectedOptions(newCourse.categories)
            console.log(selectedOptions);
            setFlag(true)
        }
    }, [newCourseStatus])

    useEffect(() => {
        const fun = async () => {
            if (editStatus == 'add') {
                setFlag(true)
            }
            console.log('in useeffect');
            console.log(newCourse);
            const date1 = getIso8601Date();
            dispatch(updateNewCourse({...newCourse,datePublished:date1}))
            if (status != 'fulfilled')
                await dispatch(fetchCategories())
            console.log(categories);
        }
        if (lectureStatus == 'fulfilled') {
            fun();
        }
        console.log(selectedOptions);
    }, [lectureStatus])

    const handleChange = (event, newSelectedOptions) => {
        console.log(newSelectedOptions);
        console.log(newCourse);
        dispatch(updateNewCourse({ ...newCourse, categories: newSelectedOptions }))
        setSelectedOptions(newSelectedOptions);

    };
    return (
        <>
            {/* {status != 'fulfilled' && <CircularProgress color="info" />} */}

            {/* <>{true  */}
            {/* {flag && <>{flag && <Fragment> */}
            {true && <Fragment>
                <Grid container spacing={3} sx={{ height: '30vh' }}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="coures name"
                            fullWidth
                            // autoComplete="shipp)ing address-line1"
                            autoComplete="course name"
                            variant="standard"
                            defaultValue={newCourse.name}
                            onChange={(event) => {
                                dispatch(updateNewCourse({ ...newCourse, name: event.target.value }))
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            name="description"
                            label="course description"
                            fullWidth
                            autoComplete="course description"
                            // autoComplete="shipping address-line2"
                            variant="standard"
                            defaultValue={newCourse.description}
                            onChange={(event) => {
                                dispatch(updateNewCourse({ ...newCourse, description: event.target.value }))
                            }}
                        />
                    </Grid>
                    {flag && <>
                        {true && <>
                            {/* {status == 'fulfilled' && <> */}
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
                        </>}  </>}

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="price"
                            name="price"
                            label="course price"
                            fullWidth
                            autoComplete="course price"
                            // autoComplete="shipping address-line2"
                            variant="standard"
                            defaultValue={newCourse.price_now}
                            onChange={(event) => {
                                dispatch(updateNewCourse({ ...newCourse, price_now: event.target.value }))
                            }}
                        />
                    </Grid>
                </Grid>
            </Fragment>}
            {/* </> */}
        </>
    )
}

export default Step_1