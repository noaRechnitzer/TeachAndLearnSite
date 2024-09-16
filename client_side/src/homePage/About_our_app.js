import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../homePage-onepriate/modules/components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function About_our_app() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', /*bgcolor: 'secondary.light'*/ backgroundColor:'#efe3df'}}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          //src="/static/themes/onepirate/productCurvyLines.png"
          src="productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="flexibility.png"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
              flexibility
              </Typography>
              <Typography variant="h5">
                {
                  'Choose the time of access to the course that suits you: a month, half a year or for life!'
                }

                {
                  'Learn at your own pace, without pressure and without long-term commitments.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="pay-off.png"
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
              Pays off             
               </Typography>
              <Typography variant="h5">
                {
                  'Adjust your investment to your needs and personal budget.'
                }

                {'Enjoy unique opportunities to expand your knowledge at attractive prices.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="user-experience.png"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
              User experience
              </Typography>
              <Typography variant="h5">
                {'A simple and easy-to-use interface, accessible from any device and at any time. '}
                {'Finding relevant courses easily, managing registrations and payments efficiently.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About_our_app;
