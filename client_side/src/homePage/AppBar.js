import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLectureById } from '../lecture/LectureSlice';

const pages = ['about', 'courses', 'lectures'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function MyAppBar() {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    const userDetails = useSelector(state => state.users.userDetails);
    const selectedLecture = useSelector(state => state.lectures.selectedLecture);
    let navigate = useNavigate();
    useEffect(() => {
        // if (user.ty == ) {
        //     setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
        //     console.log(user);
        // }
        setUser(JSON.parse(localStorage.getItem('user')))
        console.log(user);
    }, [])
    useEffect(() => {
        setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    }, [userDetails])
    useEffect(() => {
        setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    }, [selectedLecture])
    function openHome() {
        navigate('/home_page')
    }
    function logout() {
        localStorage.setItem('user', null);
        navigate('/home_page')
        setUser(null)

    }
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    useEffect(() => {
    }, [])
    const navigaeToPersonal = () => {
        console.log(user);
        if (user.type == 'user')
          navigate('/personal-Area-user') 
        if (user.type == 'lecture') 
          navigate('/personal-Area-lecture')
        if (user.type == 'admin') 
          navigate('/personal-Area-admin')
        handleCloseUserMenu()
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Button
                            onClick={openHome}
                        // sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <img className='logo' src='logo2.png' />
                        </Button>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>


                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem key={"about"} onClick={() => navigate('/home_page')}>
                                <Typography textAlign="center">about</Typography>
                            </MenuItem>
                            <MenuItem key={"courses"} onClick={() => navigate('/category_list')}>
                                <Typography textAlign="center">courses</Typography>
                            </MenuItem>
                            <MenuItem key={"lectures"} onClick={() => navigate('/lectures')}>
                                <Typography textAlign="center">lectures</Typography>
                            </MenuItem>
                            <MenuItem key={"Questions_and_Answers"} onClick={() => navigate('/Questions_and_Answers')}>
                                <Typography textAlign="center">Questions and Answers</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Button
                            onClick={openHome}
                        // sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <img className='logo' src='logo2.png' />
                        </Button>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key={"about"}
                            onClick={() => navigate('/home_page')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            about
                        </Button>
                        <Button
                            key={"courses"}
                            onClick={() => navigate('/category_list')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            courses
                        </Button>
                        <Button
                            key={"lectures"}
                            onClick={() => navigate('/lectures')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            lectures
                        </Button>
                        <Button
                            key={"Questions_and_Answers"}
                            onClick={() => navigate('/Questions_and_Answers')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Questions and Answers
                        </Button>
                        {/* {pages.map(lecturesage) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {console.log(userDetails)}
                        {user == null && <Button color="inherit" onClick={() => navigate('/singIn')}>Login</Button>}
                        {user != null && <><Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ height: '50px', width: '50px' }} alt={user.firstName} src={selectedLecture.picture} />
                            </IconButton>
                        </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => ( */}
                                <MenuItem onClick={navigaeToPersonal}>
                                    <Typography textAlign="center">personal area</Typography>
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                                {/* ))} */}
                            </Menu></>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default MyAppBar;