import React from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNewCategory } from '../CategorySlice'
import { Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'

function Step_1() {
    const newCategory = useSelector(state => state.categories.newCategory)
    const editStatus = useSelector(state => state.categories.editStatus)
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch(0)

    useEffect(() => {
        setFlag(true)
    }, [newCategory])
    useEffect(() => {
        if (editStatus == 'add') {
            setFlag(true)
        }
    }, [])
    return (<>
        {flag&&<Fragment>
            <Grid container spacing={3} sx={{height:'30vh'}}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="category name"
                        fullWidth
                        // autoComplete="shipp)ing address-line1"
                        autoComplete="category name"
                        variant="standard"
                        defaultValue={newCategory.name}
                        onChange={(event) => {dispatch(updateNewCategory({ ...newCategory, name: event.target.value }))
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        name="description"
                        label="category description"
                        fullWidth
                        autoComplete="category description"
                        // autoComplete="shipping address-line2"
                        variant="standard"
                        defaultValue={newCategory.description}
                        onChange={(event) => { dispatch(updateNewCategory({ ...newCategory, description: event.target.value })) }}
                    />
                </Grid>
            </Grid>
        </Fragment>}
        </>)
}

export default Step_1