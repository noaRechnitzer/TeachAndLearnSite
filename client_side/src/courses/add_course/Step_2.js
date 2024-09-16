import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from 'react';
import { updateNewCourse } from '../courseSlice';

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
    const newCourse = useSelector(state => state.courses.newCourse)
    const editStatus = useSelector(state => state.courses.editStatus)
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [toAdd, setToAdd] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [video2, setVideo2] = useState(null);
    const handleUpload = (e) => {
        // if (editStatus == 'edit') {
        //     dispatch(updateNewCourse({ ...newCourse, videoS: true }))
        // }
        const file = e.target.files[0];

        // Check file size and type

        // if (file.size > 10000000) {
        //     alert("File size must be less than 10MB.");
        //     return;
        // }

        if (!file.type.startsWith("video/")) {
            alert("Only video files are allowed.");
            return;
        }

        setVideo(file);
        dispatch(updateNewCourse({ ...newCourse, currentFileVideo: file , videoS: true}))

    };
    const handleImageUpload = (e) => {
        // if (editStatus == 'edit') {
            // dispatch(updateNewCourse({ ...newCourse, imageS: true }))
        // }
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
            console.log("save");
        }
        dispatch(updateNewCourse({ ...newCourse, currentFileImage: selectedFile , imageS: true}))

    };
    const handleSave = async (e) => {
        e.preventDefault();
        console.log("ok");
        setToAdd(true);
    };
    // useEffect(() => {
    //     if (toAdd) {
    //         if (newCourse.imageS == true) {
    //             dispatch(updateNewCourse({ ...newCourse, currentFileImage: file.get('Image') }))
    //         }
    //         if (newCourse.videoS == true) {
    //             dispatch(updateNewCourse({ ...newCourse, currentFileVideo: video }))
    //         }
    //         // dispatch(updateNewCategory({...newCategory,fileImage: image}))
    //     }
    // }, [toAdd]);

    useEffect(() => {
        console.log("ppppppp;");
        console.log(editStatus);
        if (editStatus == 'edit') {
            setVideo(newCourse.fileVideo)
            setSelectedImage(newCourse.picture)
            console.log(image);
        }
        else {
            if (newCourse.currentFileImage) {
                const reader = new FileReader();

                reader.onload = () => {
                    setSelectedImage(reader.result);
                };

                reader.readAsDataURL(newCourse.currentFileImage);
            }
            if (newCourse.currentFileVideo) {
                const reader = new FileReader();

                reader.onload = () => {
                    setVideo(reader.result);
                };

                reader.readAsDataURL(newCourse.currentFileVideo);
            }

        }
    }, [])
    return (
        <>
            <Fragment>
                <Typography variant="h6" gutterBottom>
                    add course image
                </Typography>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column',alignItems:'center' }}>
                        <Button
                            sx={{ width: '160px' }}
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
                        <div style={{ height: '200px', width: '200px', backgroundColor: '#e7eff6', margin: '10px' }}>{selectedImage && (
                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                        )}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column',alignItems:'center' }}>
                        <Button
                            sx={{ width: '160px' }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            onChange={handleUpload}
                        >
                            Upload video
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <div style={{ height: '200px', width: '200px', backgroundColor: '#e7eff6', margin: '10px' }}>
                            {/* <input type="file" onChange={handleUpload} /> */}
                            {video && (
                                <video style={{ height: '200px' ,width: '200px'}} controls>
                                    <source src={video} type="video/mp4" />
                                </video>
                            )}
                        </div>
                    </div></div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                            label="Remember credit card details for next time"
                        />
                    </Grid>
                </Grid>
            </Fragment>
        </>
    )
}

export default Step_2