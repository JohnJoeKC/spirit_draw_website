import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PrizesCarousel from '../components/PrizesCarousel';

const Prizes: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Box 
      maxWidth="lg"
      className="px-8 md:px-16"
      id="prizes"
    >
      <Typography variant="h2" component="h2" gutterBottom align="center">
        {t('prizes.title')}
      </Typography>
      <PrizesCarousel />
    </Box>
  );
};

export default Prizes; 