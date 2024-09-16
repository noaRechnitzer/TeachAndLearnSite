import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { fetchCategories, setSelectedCategory } from './CategorySlice';
import CategoryCard from './CategoryCard';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CourseList from '../courses/CourseList';
import { addViews, getDetails, updatehViews } from '../users/userSlice11';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';


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


export default function CategoryPage() {

    const navigate = useNavigate();
    const category = useSelector(state => state.categories.categories)
    const status = useSelector(state => state.categories.status)
    const viewsPerUserStatus = useSelector(state => state.views.viewsPerUserStatus);
    const viewsPerUser = useSelector(state => state.views.viewsPerUser);
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.users.userDetails);
    const userStatus = useSelector(state => state.users.userStatus);

    useEffect(() => {
        const fun = async () => {
            console.log('in useeffect');
            if (user != null) {
                if (user.type == 'user') {
                    if (userStatus != 'fulfilled')
                        await dispatch(getDetails(user.id))
                }
            }
            if (status != 'fulfilled')
                dispatch(fetchCategories())
            console.log(category);

        }
        fun()


    }, [])
    const add_update_views = async (id) => {
        console.log(userDetails);
        let view = undefined
        if (userStatus == 'fulfilled') {
            userDetails.views.forEach(element => {
                if (element.categoryId == id) {
                    console.log(element);
                    view = { ...element }
                    return 0;
                }
            });
            if (view != undefined) {
                dispatch(updatehViews({ id: view.id, categoryId: id, userId: user.id, numView: view.numView + 1 }))
            }
            else
                dispatch(addViews({ categoryId: id, userId: user.id }))
        }

    }
    return (
        <div style={{backgroundColor:'#d3e2e9'}}>
            {status != 'fulfilled' && <CircularProgress color="info" />}
            {status == 'fulfilled' &&<Container component="section" sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" marked="center" align="center" component="h2">
                    For all fields and all languages
                </Typography>
                <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {category && category.map((category) => {
                        return (
                            <div style={{
                                padding: '20px'
                            }}>
                                <ImageIconButton
                                    key={category.name}
                                    style={{
                                        width: '250px',
                                        height: '250px'
                                    }}
                                    onClick={async () => {
                                        await dispatch(setSelectedCategory(category))
                                        await add_update_views(category.id)
                                        return navigate('/course_list/' + category.id)
                                    }}
                                // onClick={() => {console.log("lll");
                                //     return <CourseList key={category.id} category={category}/>}}
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
                                            backgroundImage: `url(${category.picture})`,
                                            backgroundRepeat: 'no-repeat',
                                            // backgroundAttachment: 'scroll',
                                            // backgroundPosition: ' 50% 50%', 
                                            height: '100%',
                                            // margin: '90px'
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
                                            {category.name}
                                            <div className="imageMarked" />
                                        </Typography>
                                    </Box>
                                </ImageIconButton>
                            </div>
                        )
                    })}
                </Box>
            </Container>}</div>
    );
}