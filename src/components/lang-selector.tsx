import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useLanguage } from '../context/language-context';

// Thanks SimplyLocalize
// https://simplelocalize.io/blog/posts/hosted-flag-icons/
const LANGUAGES = ['nl', 'gb'];
const FLAG_SIZE = 32;
const FLAG_SIZE_MENU = 20;

const LangSelector = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { language, setLanguage } = useLanguage();
  const flagUrl = `https://cdn.simplelocalize.io/public/v1/flags/${language}.svg`;

  const handleLangChange = (selectedLang: string) => {
    setLanguage(selectedLang);
    handleClose();
  };

  return (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size='small'
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: FLAG_SIZE, height: FLAG_SIZE }}>
            <img
              src={flagUrl}
              alt={language}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='language-menu'
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LANGUAGES.map((language) => (
          <MenuItem key={language} onClick={() => handleLangChange(language)}>
            <img
              src={`https://cdn.simplelocalize.io/public/v1/flags/${language}.svg`}
              alt={language}
              style={{ width: FLAG_SIZE_MENU, height: FLAG_SIZE_MENU, marginRight: 8 }}
            />
            <Typography>{language.toUpperCase()}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default LangSelector;

