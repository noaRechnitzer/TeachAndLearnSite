import { Input } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from "react";
import React from 'react'

function AddImg() {
    // const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [toAdd, setToAdd] = useState(false);


    useEffect(() => {
        const fun = async () => {
            if (toAdd) {
                const formData = new FormData();
                formData.append('Name', "Cdcccccccccv");
                formData.append('Description', "ccccccc");
                formData.append('Picture', "xx");
                formData.append('FileImage', file.get('Image'));
                try {
                    console.log(file.get('Image'));
                    const res = await axios.post("https://localhost:7094/api/Category", 
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log("Post created:");
                    console.log(res);
                } catch (error) {
                    console.error("Error creating post:", error);
                }
            }
        }
        const fun1 = async () => {
            if (toAdd) {
                const formData = new FormData();
                formData.append('Name', "Cdcccccccccv");
                formData.append('Description', "ccccccc");
                formData.append('DatePublished', new Date(2024, 3, 1) );
                formData.append('Price_first', 1);
                formData.append('Price_now', 1);
                formData.append('Language', 1);
                formData.append('Num_chapter', 1);
                formData.append('Duration', 1);
                formData.append('Picture', "nh");
                formData.append('FileImage', file.get('Image'));
                formData.append('LectureId', 2);
                formData.append('CategoriesId', [3,4]);
                try {
                    const res = await axios.post("https://localhost:7094/api/Course", 
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log("Post created:");
                    console.log(res);
                } catch (error) {
                    console.error("Error creating post:", error);
                }
            }
        }
        fun();
    }, [toAdd]);


    const handleImageUpload = (e) => {
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
        // try {
        //     const res = await axios.post("https://localhost:7094/api/Course", {
        //         name: "VCXXXXXXXXXXXXXX",
        //         description: "FFFFFFFFFF",
        //         datePublished: new Date(2024, 3, 1),
        //         price_first: 2,
        //         price_now: 2,
        //         language: 1,
        //         num_chapter: 1,
        //         duration: 2,
        //         picture: "m",
        //         fileImage: file.get('Image'),
        //         lectureId: 2,
        //         categoriesId: [3, 4]
        //     });
        //     console.log("Post created:");
        //     console.log(res);
        // } catch (error) {
        //     console.error("Error creating post:", error);
        // }


    };
    return (<>
        {/* <form onSubmit={handleSubmit}>
            <input type="file" name="image" onChange={handleImageChange} />
            <button type="submit">הוסף תמונה</button>
            <button onClick={fun}>after</button>
        </form>  */}
        <input type="file" onChange={handleImageUpload} />

        {/* <Input
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            accept="image/*"
            sx={{
                height: "100px",
                bgcolor: "transparent",
            }}
            id="image-upload"
        /> */}
        {/* <button onClick={() => document.getElementById('image-upload').click()}>Add Image</button> */}
        {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
        )}
        <Button onClick={handleSave} color="primary">
            שמור
        </Button>
    </>
    )
}

export default AddImg