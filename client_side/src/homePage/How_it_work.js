import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../homePage-onepriate/modules/components/Typography';
import Button from '../homePage-onepriate/modules/components/Button';

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: 'secondary.main',
    fontWeight: 'medium',
};

const image = {
    height: 55,
    my: 4,
};

function How_it_work() {
    return (
        <Box
            component="section"
            sx={{ display: 'flex',/* bgcolor: 'secondary.light',*/ overflow: 'hidden' ,backgroundColor:'#efe3df'}}
        >
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="img"
                    src="productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                        opacity: 0.7,
                    }}
                />
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.</Box>
                                <Box
                                    component="img"
                                    src="security.png"
                                    alt="suitcase"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center">
                                    Log in to the site.
                                    Create a new account or alternatively, enter an existing account
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                <Box
                                    component="img"
                                    src="choose.png"
                                    alt="graph"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center">
                                    Choose the course you need!
                                    Now choose the type of subscription, monthly, half-yearly or for life!
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                <Box
                                    component="img"
                                    src="personal-info.png"
                                    alt="clock"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center">
                                    {'Enter the personal area -> my courses '}
                                    {'Now you can start learning!'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    component="a"
                    href="/sign-up/"
                    sx={{ mt: 8 }}
                >
                    Get started
                </Button>
            </Container>
        </Box>
    );
}

export default How_it_work;
