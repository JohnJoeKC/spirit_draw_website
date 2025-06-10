import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009A49',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#444444',
    },
    background: {
      default: '#FFFFFF',
      paper: '#EEEEEE',
    },
  },
    typography: {
      fontFamily: '"Garamond", "EB Garamond", serif',
    h1: {
      fontFamily: '"Garamond", "EB Garamond", serif',
      fontSize: '3rem',
      fontWeight: 500,
    },
    h2: {
      fontFamily: '"Garamond", "EB Garamond", serif',
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h3: {
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: '1.2rem',
      fontWeight: 800,
    },
    body1: {
      fontSize: '1.2rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F5F5F5',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px 24px 16px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F5F5F5',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#E0E0E0',
          },
        },
      },
    },
  },
});

export default theme;