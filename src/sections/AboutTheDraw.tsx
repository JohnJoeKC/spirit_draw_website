import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Grid, Paper } from '@mui/material';
import MainVisual from '../assets/marketing_assets/spirit_draw_main_visual.png';

const AboutTheDraw: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box id="about" sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={MainVisual}
              alt={t('aboutTheDraw.visualAlt')}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              {t('aboutTheDraw.title')}
            </Typography>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom>
                {t('aboutTheDraw.howItWorksTitle')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('aboutTheDraw.howItWorksDetails')}
              </Typography>

              <Typography variant="h5" component="h3" gutterBottom>
                {t('aboutTheDraw.whenTitle')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('aboutTheDraw.whenDetails')}
              </Typography>

              <Typography variant="h5" component="h3" gutterBottom>
                {t('aboutTheDraw.howMuchTitle')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('aboutTheDraw.howMuchDetails')}
              </Typography>

              <Typography variant="h5" component="h3" gutterBottom>
                {t('aboutTheDraw.whoBenefitsTitle')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('aboutTheDraw.whoBenefitsDetails')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
};

export default AboutTheDraw; 