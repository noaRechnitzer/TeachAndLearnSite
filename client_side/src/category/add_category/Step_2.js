import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCategory, updateNewCategory } from '../CategorySlice';
import { Fragment } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from 'react';
import updateNewCategoryImage from '../CategorySlice'

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

function Step_2() {
    const newCategory = useSelector(state => state.categories.newCategory)
    const editStatus = useSelector(state => state.categories.editStatus)
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [toAdd, setToAdd] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [video2, setVideo2] = useState(null);

    const handleImageUpload = (e) => {
        if (editStatus == 'edit') {
            console.log('imagess');
            dispatch(updateNewCategory({ ...newCategory, imageS: true }))
        }
        const selectedFile = e.target.files[0];
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
    const handleSave = async (e) => {
        e.preventDefault();
        console.log("ok");
        setToAdd(true);
        // setImage(file.get('Image'))

        // dispatch(updateNewCategoryImage(selectedImage));
    };
    useEffect(() => {
        if (toAdd) {
            console.log("in toadd");
            dispatch(updateNewCategory({ ...newCategory, currentFileImage: file.get('Image') }))
        }
    }, [toAdd]);

    useEffect(() => {
        if (editStatus == 'edit') {
            setSelectedImage(newCategory.FileImage)
        }
        else {
            if (newCategory.currentFileImage) {
                const reader = new FileReader();

                reader.onload = () => {
                    setSelectedImage(reader.result);
                };

                reader.readAsDataURL(newCategory.currentFileImage);
            }
        }
    }, [])
    return (
        <>
            <Fragment>
                <Grid sx={{ height: '30vh' }}>
                    <Typography variant="h6" gutterBottom>
                        add category image
                    </Typography>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        onChange={handleImageUpload}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                    {/* <input type="file" onChange={handleImageUpload} /> */}
                    {selectedImage && (
                        <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    )}
                    {/* <div>
                        {image && <img src={selectedImage} alt="תמונה" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                    </div> */}
                    <Button onClick={handleSave} color="primary">
                        save
                    </Button>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                label="Remember credit card details for next time"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        </>
    )
}

export default Step_2