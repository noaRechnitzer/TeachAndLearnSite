import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLectures } from './LectureSlice';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { CircularProgress } from '@mui/material';

export default function LectureList() {
    const lectures = useSelector(state => state.lectures.lectures)
    const status = useSelector(state => state.lectures.status)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('in useeffect');
        if (status != 'fulfilled')
            dispatch(fetchLectures())
        console.log(lectures);
    }, [])
  return (<>    {status!='fulfilled'&& <CircularProgress color="secondary" />}
    {status=='fulfilled'&&<ImageList sx={{ display: 'flex',alignItems:'flex-start',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',backgroundColor:'#ccdae1'}}>
      {lectures.map((item) => (
        <ImageListItem key={item.picture} sx={{width:'350px',height:'500px',margin:'20px'}}>
          <img
          style={{height:'350px'}}
            sx={{width:'350px'}}
            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            // src={`${item.img}?w=248&fit=crop&auto=format`}
            src={item.picture}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            sx={{height:'80px', fontSize:'50px'}}
            title={item.firstName+" "+item.lastName}
            subtitle={item.description}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.firstName}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>}</>
  );
}

