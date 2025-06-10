import React from 'react';
import InteractiveMap from '../components/InteractiveMap';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FullLineup from '../assets/marketing_assets/full_lineup.png';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      maxWidth="lg"
      className="flex flex-col md:flex-row items-center justify-center gap-10 px-8 md:px-16"
    >
      <Box className="flex flex-col w-full text-center md:flex-1 md:max-w-[60%] items-center justify-center gap-10">
        <Box className="flex flex-col items-center justify-center">
          <Typography variant="h1" component="h1" gutterBottom>
            {t('hero.title')}
          </Typography>
          <Typography variant="h5" component="p">
            {t('hero.subtitle')}
          </Typography>
        </Box>
        <img src={FullLineup} alt="Full Lineup" className="w-full h-auto" />
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={(e) => {
            e.preventDefault();
            console.log("Buy Ticket clicked");
          }}
        >
          {t('navigation.buyTicket')}
        </Button>
      </Box>
      <Box className="flex w-full h-full md:flex-1 md:max-w-[40%] items-center justify-center">
        <InteractiveMap />
      </Box>
    </Box>
  );
};

export default HeroSection; 