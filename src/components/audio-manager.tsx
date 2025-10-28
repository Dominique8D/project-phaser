import React from 'react';
import { Menu, MenuItem, IconButton, Typography, Slider, Box } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import { getMusicVolume, getSfxVolume, setMusicVolume, setSfxVolume } from '../state/audio-state';

const VOLUME_MIN = 0;
const VOLUME_MAX = 1;
const VOLUME_STEP = 0.01;
const VOLUME_FULL = 1;

const ICON_MARGIN_RIGHT = 1;
const SLIDER_MARGIN_LEFT = 1;
const CONTROL_WIDTH = 200;

const getVolumeIcon = (value: number, onClick: () => void) => {
  const iconProps = { sx: { mr: ICON_MARGIN_RIGHT, cursor: 'pointer' }, onClick };
  if (value === 0) return <VolumeOffIcon {...iconProps} />;
  if (value < 0.5) return <VolumeDownIcon {...iconProps} />;
  return <VolumeUpIcon {...iconProps} />;
};

type VolumeControlProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
};

const VolumeControl = ({ label, value, onChange }: VolumeControlProps) => {
  const toggleMute = () => {
    onChange(value === VOLUME_MIN ? VOLUME_FULL : VOLUME_MIN);
  };

  return (
    <MenuItem disableRipple>
      <Box sx={{ width: CONTROL_WIDTH }}>
        <Typography variant='body2' gutterBottom>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getVolumeIcon(value, toggleMute)}
          <Slider
            value={value}
            onChange={(_, v) => onChange(v as number)}
            min={VOLUME_MIN}
            max={VOLUME_MAX}
            step={VOLUME_STEP}
            size='small'
            sx={{ ml: SLIDER_MARGIN_LEFT }}
          />
        </Box>
      </Box>
    </MenuItem>
  );
};

const AudioManager = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [musicVolume, setMusicVolumeState] = React.useState(getMusicVolume());
  const [sfxVolume, setSfxVolumeState] = React.useState(getSfxVolume());
  const { t } = useLangTranslation('common');

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMusicChange = (v: number) => {
    setMusicVolumeState(v);
    setMusicVolume(v);
  };

  const handleSfxChange = (v: number) => {
    setSfxVolumeState(v);
    setSfxVolume(v);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size='small'
        aria-controls={open ? 'audio-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <MusicNoteIcon color='secondary' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='audio-menu'
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ p: 2 }}
      >
        <VolumeControl label={t('musicVolume')} value={musicVolume} onChange={handleMusicChange} />
        <VolumeControl label={t('sfxVolume')} value={sfxVolume} onChange={handleSfxChange} />
      </Menu>
    </>
  );
};

export default AudioManager;

