import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PrizesCarousel from '../components/PrizesCarousel';

const Prizes: React.FC = () => {
  return (
    <Container sx={{ py: 8 }} id="prizes">
      <Typography variant="h2" component="h2" gutterBottom align="center">
        Prizes
      </Typography>
      <PrizesCarousel />
    </Container>
  );
};

export default Prizes; 