import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import MainVisual from '../assets/marketing_assets/spirit_draw_main_visual.png';

const AboutTheDraw: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box 
      id="about" 
      maxWidth="lg"
      className="px-8 md:px-16"
    >
      <Box className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
        <Box className="w-full md:w-2/5 flex justify-center items-center rounded-lg">
          <Box
            component="img"
            src={MainVisual}
            alt={t('aboutTheDraw.visualAlt')}
            className="w-full max-w-[400px] h-auto p-4"
          />
        </Box>
        <Box className="w-full md:w-3/5">
          <Typography variant="h2" component="h2" gutterBottom>
            {t('aboutTheDraw.title')}
          </Typography>
          <Box>
            <Typography variant="h6" component="h3" className="mb-2">
              {t('aboutTheDraw.howItWorksTitle')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('aboutTheDraw.howItWorksDetails')}
            </Typography>

            <Typography variant="h6" component="h3" className="mb-2">
              {t('aboutTheDraw.whenTitle')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('aboutTheDraw.whenDetails')}
            </Typography>

            <Typography variant="h6" component="h3" className="mb-2">
              {t('aboutTheDraw.howMuchTitle')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('aboutTheDraw.howMuchDetails')}
            </Typography>

            <Typography variant="h6" component="h3" className="mb-2">
              {t('aboutTheDraw.whoBenefitsTitle')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('aboutTheDraw.whoBenefitsDetails')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutTheDraw; 