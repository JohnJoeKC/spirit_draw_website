import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Container, Box, IconButton, Drawer, List, ListItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import LanguageChanger from '../components/LanguageChanger'; // Adjusted path
import { useScrollSpy } from '../hooks/useScrollSpy'; // Corrected path

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { labelKey: 'navigation.about', href: '#about' },
    { labelKey: 'navigation.prizes', href: '#prizes' },
    { labelKey: 'navigation.beneficiaries', href: '#beneficiaries' },
  ];

  const sectionIds = navItems.map(item => item.href); // Pass hrefs directly (e.g., '#prizes')
  const activeSection = useScrollSpy(sectionIds, {
    // Optional: customize IntersectionObserver options here
    // rootMargin: '0px 0px -40% 0px', // Example: highlight when section is 40% from bottom of viewport
    // threshold: 0.6, // Example: highlight when 60% of the section is visible
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (itemHref: string) => {
    // activeSection will be like '#prizes'. itemHref is also '#prizes'
    return activeSection === itemHref;
  };

  const handleNavClick = (href: string) => {
    // We don't need to manually setActiveSection on click anymore,
    // useScrollSpy will handle it based on scroll position.
    if (mobileOpen) {
      handleDrawerToggle();
    }
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Manually set for instant feedback before scroll completes, 
    // though scroll spy will correct it if needed.
    // setActiveSection(href.substring(1)); // No longer calling the local setActiveSection
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left', p: 2 }}>
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'flex-start' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LOGO
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} className="text-left px-0">
            <Button 
              onClick={() => handleNavClick(item.href)} // Keep for smooth scroll
              sx={{
                position: 'relative',
                color: 'text.primary',
                justifyContent: 'flex-start',
                textAlign: 'left',
                fontWeight: isActive(item.href) ? 'bold' : 'normal',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'primary.main',
                  transform: isActive(item.href) ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover::after': {
                  transform: 'scaleX(1)',
                }
              }}
            >
              {t(item.labelKey)}
            </Button>
          </ListItem>
        ))}
        <ListItem className="text-left px-0">
          <Button 
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              console.log("Buy Ticket clicked");
              handleDrawerToggle();
            }}
          >
            {t('navigation.buyTicket')}
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Container className="w-full"> 
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>LOGO</a>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => handleNavClick(item.href)} // Keep for smooth scroll
                sx={{ 
                  mx: 1, 
                  color: 'text.primary',
                  position: 'relative',
                  height: '64px',
                  fontWeight: isActive(item.href) ? 'bold' : 'normal',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    backgroundColor: 'primary.main',
                    transform: isActive(item.href) ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  }
                }}
              >
                {t(item.labelKey)}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, justifyContent: 'flex-end' }}>
            <LanguageChanger />

            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2, display: { xs: 'none', md: 'block' } }}
              onClick={(e) => {
                e.preventDefault();
                console.log("Buy Ticket clicked");
              }}
            >
              {t('navigation.buyTicket')}
            </Button>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 1, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header; 