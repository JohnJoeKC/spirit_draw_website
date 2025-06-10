import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import LanguageIcon from '@mui/icons-material/Language';

const languages = [
  { code: 'en', nameKey: 'english' },
  { code: 'ga', nameKey: 'irish' },
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
          <Box className="flex items-center">
            <LanguageIcon />
            <span className="ml-1 text-sm">{currentLanguage.code.toUpperCase()}</span>
          </Box>
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
            <Box className="flex items-center">
              <LanguageIcon className="mr-2" />
              <span>{t(lang.nameKey)}</span>
              <span className="ml-2 text-sm text-gray-500">({lang.code.toUpperCase()})</span>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageChanger; 