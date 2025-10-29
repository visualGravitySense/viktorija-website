import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const getLanguageLabel = (code: string) => {
    switch (code) {
      case 'ru':
        return 'RU';
      case 'et':
        return 'ET';
      case 'en':
        return 'EN';
      default:
        return code.toUpperCase();
    }
  };

  return (
    <>
      <Button
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        size="small"
        color="primary"
        variant="text"
        sx={{
          color: 'primary.main',
        }}
      >
        {getLanguageLabel(i18n.language)}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => changeLanguage('ru')}>{t('languages.ru')}</MenuItem>
        <MenuItem onClick={() => changeLanguage('et')}>{t('languages.et')}</MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>{t('languages.en')}</MenuItem>
      </Menu>
    </>
  );
} 