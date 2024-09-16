import React, { useState, useEffect, useRef } from "react";
import './homePage.css'
import MyAppBar from "./AppBar";
import '@fontsource/roboto/300.css';
import { Typography } from "@mui/material";
import How_it_work from './How_it_work'
import About_our_app from "./About_our_app";
import CategoryPage from "../category/CatogoryPage";
import axios from 'axios';
import Pricing from "../purchase/Pricing";

const HomePage = () => {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const cursorRef = useRef(null);
    const [text1, setText1] = useState("");
    const [indexx, setIndexx] = useState(0);
    const [video, setVideo] = useState(0);
    const cursorRef1 = useRef(null);
    const textt = "wellcome to our courses!!   learn in your time and place you want."
    const textt1 = "learn in yout time and place you want."
    useEffect(() => {
        const interval = setInterval(() => {
            if (index < 100) {
                setText(text => text + textt.charAt(index));
                setIndex(index => index + 1);
                //cursorRef.current.style.left = `${index * 10}px`;
            }
            else {
                setText("");
                setIndex(0);
                setTimeout(() => {
                    interval;
                }, 55000);
            }

        }, 80);

        return () => clearInterval(interval);
    }, [text, index]);


    useEffect(() => {
        const fun = async () => {
            try {
                const response = await axios.get("https://localhost:7094/api/Course/getVideo/1000013475.mp4");
                setVideo(response.data);

                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
            // return {}
        }
        fun()
    }, []);

    return (<><div style={{backgroundColor:'#efe3df'}}>
        <div className="back_img">
            <Typography className="animation" variant="h2" gutterBottom>
                {text}
            </Typography>
            <br></br>
            <h1 className="animation">{text1}</h1>
            {/* <span ref={cursorRef1} className="cursor">|</span> */}
        </div>
        <About_our_app></About_our_app>
        <div style={{ backgroundColor: 'rgb(230 209 202)' }}>

            <CategoryPage></CategoryPage>
        </div>
        <How_it_work></How_it_work></div>
    </>
    );
};

export default HomePage;