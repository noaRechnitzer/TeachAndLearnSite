import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
const backgroundImage =
//'https://unsplash.com/photos/black-flat-screen-computer-monitor-mZnx9429i94';
// './picture/1.jpg';
'https://img.freepik.com/free-photo/programming-language-workplace_1134-65.jpg?w=996&t=st=1707000844~exp=1707001444~hmac=5c16f3aa428b71c742a18e1d3b649bc12b758b282de5def3386aa1ac1ab8fc8d';
  //'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        שדרגו את הלמידה שלכם
        {/* Upgrade your Sundays */}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        תהנו מחווית למידה מועילה, מותאמת לקצב ולזמן שלכם והכי חשוב, לכיס שלכם
        {/* Enjoy secret offers up to -70% off the best luxury hotels every Sunday. */}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
