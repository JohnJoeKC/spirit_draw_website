import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import Header from './sections/Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'; // Import Typography for the message
import AgeVerificationDialog from './components/AgeVerificationDialog'; // Import the dialog
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import theme from './theme'; // Import the theme from the dedicated file
import './i18n'; // Import the i18n configuration
import Box from '@mui/material/Box'; // For layout
import Prizes from './sections/Prizes'; // Import Prizes section
import Beneficiaries from './sections/Beneficiaries'; // Import Beneficiaries section
import HeroSection from './sections/HeroSection'; // Import HeroSection
import AboutTheDraw from './sections/AboutTheDraw';

function App() {
  const { t } = useTranslation(); // Initialize useTranslation
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeDialog, setShowAgeDialog] = useState(true);
  const [accessDeniedMessageKey, setAccessDeniedMessageKey] = useState<string | null>(null);

  const handleAgeConfirm = () => {
    setIsAgeVerified(true);
    setShowAgeDialog(false);
    setAccessDeniedMessageKey(null);
  };

  const handleAgeDeny = () => {
    setIsAgeVerified(false);
    setShowAgeDialog(false);
    setAccessDeniedMessageKey('accessDenied'); // Set the key for translation
  };

  // Show dialog on initial load - useEffect not strictly needed here as default state handles it.
  // But if you wanted to re-trigger it under other conditions, useEffect would be the place.

  return (
    <ThemeProvider theme={theme}> {/* Apply the theme to the entire app */}
      <CssBaseline /> {/* CssBaseline should be after ThemeProvider to use theme defaults */}
      <div className="relative">
        {/* Main content always renders */}
        <Header />
        <Container 
          maxWidth={false}
          disableGutters
          className="flex flex-col items-center justify-center w-full mt-10"
        > {/* Main content container */}
          <Box className="flex flex-col items-center justify-center w-full gap-10">
            <Box className="flex flex-col items-center w-full">
              <HeroSection />
            </Box>
            <Box 
              className="flex flex-col items-center w-full" 
              sx={{ backgroundColor: 'background.paper' }}>
              <AboutTheDraw />
            </Box>
            <Box className="flex flex-col items-center w-full">
              <Prizes />
            </Box>
            <Box 
              className="flex flex-col items-center w-full" 
              sx={{ backgroundColor: 'background.paper' }}>
              <Beneficiaries />
            </Box>
          </Box>
        </Container>

        {/* Access denied message */}
        {accessDeniedMessageKey && (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-20">
            <Container maxWidth={false} disableGutters className="w-full h-full">
              <div className="min-h-screen flex flex-col items-center justify-center">
                <Typography variant="h6" color="error" align="center">
                  {t(accessDeniedMessageKey)} {/* Translate the message */}
                </Typography>
                <Typography variant="body2" color="white" align="center" className="mt-2">
                  {t('accessDeniedGuidance')} {/* Translate the guidance text */}
                </Typography>
              </div>
            </Container>
          </div>
        )}

        {/* Age verification dialog */}
        <AgeVerificationDialog
          open={showAgeDialog}
          onConfirm={handleAgeConfirm}
          onDeny={handleAgeDeny}
        />
      </div>
    </ThemeProvider>
  );
}

export default App; 