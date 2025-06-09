import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// Import flag images
// Ensure these paths are correct relative to this component's location or use absolute paths from /src
import englishFlag from '../assets/language_flags/british.png';
import irishFlag from '../assets/language_flags/irish.png';

const languages = [
  { code: 'en', nameKey: 'english', flag: englishFlag, altText: 'English flag' },
  { code: 'ga', nameKey: 'irish', flag: irishFlag, altText: 'Irish flag' },
];

const LanguageChanger: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Box className="flex items-center">
      <Tooltip title={t('language') || 'Change language'}>
        <IconButton onClick={handleClick} size="small" className="ml-1 p-1">
          <img 
            src={currentLanguage.flag} 
            alt={currentLanguage.altText} 
            style={{ width: '24px', height: 'auto' }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
      >
        {languages.map((lang) => (
          <MenuItem 
            key={lang.code} 
            selected={lang.code === i18n.language}
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center justify-between min-w-24"
          >
            <span style={{ marginRight: '8px' }}>{t(lang.nameKey)}</span>
            <img 
              src={lang.flag} 
              alt={lang.altText} 
              style={{ width: '20px', height: 'auto' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageChanger; 