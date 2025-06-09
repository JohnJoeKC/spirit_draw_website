import React from 'react';
import InteractiveMap from '../components/InteractiveMap';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FullLineup from '../assets/marketing_assets/full_lineup.png';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      className="flex flex-col md:flex-row items-center justify-center gap-5"
      sx={{ mt: 4 }} // Added some margin top for spacing from the new Header
    >
      <Box className="flex flex-col w-full text-center md:flex-1 md:max-w-[60%] items-center justify-center">
        <Typography variant="h1" component="h1" gutterBottom>
          {t('hero.title')}
        </Typography>
        <Typography variant="h4" component="p">
          {t('hero.subtitle')}
        </Typography>
        <img src={FullLineup} alt="Full Lineup" className="w-full h-auto mt-4" />
      </Box>
      <Box className="flex w-full h-full md:flex-1 md:max-w-[40%] items-center justify-center">
        <InteractiveMap />
      </Box>
    </Box>
  );
};

export default HeroSection; 