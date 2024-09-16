import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import axios from 'axios';
import { useState, useEffect } from "react";

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    //url: 'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400',
    url: 'https://cdn-icons-png.flaticon.com/128/721/721791.png',
    title: 'java script',
    width: '40%',
  },
  {
    //url: 'https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400',
    url: 'https://cdn-icons-png.flaticon.com/128/4299/4299932.png',
    title: 'pyton',
    width: '20%',
  },
  {
    url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400',
    title: 'Hiking',
    //title: category[0].name,
    width: '40%',
  },
  {
    url: 'https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400',
    title: 'Tour',
    //title: category[1].name,
    width: '38%',
  },
  {
    url: 'https://images.unsplash.com/photo-1523309996740-d5315f9cc28b?auto=format&fit=crop&w=400',
    title: 'Gastronomy',
    //title: category[2].name,
    width: '38%',
  },
  {
    url: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400',
    title: 'Shopping',
    //title: category[3].name,
    width: '24%',
  },
  {
    url: 'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400',
    title: 'Walking',
    width: '40%',
  },
  {    
    url: 'https://cdn-icons-png.flaticon.com/128/6132/6132221.png',
   // url: 'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400',
    title: 'dotnet',
    width: '20%',
  },
  {
    url: 'https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400',
    title: 'Reading',
    width: '40%',
  },
];

export default function ProductCategories() {

  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
              margim: '5px'
            
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
                backgroundRepeat: 'no-repeat',
                // backgroundAttachment: 'scroll',
                // backgroundPosition: ' 50% 50%', 
                height:'100%'
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
      <button onClick={fetchCategories}>jhg</button>

    </Container>
  );
}
