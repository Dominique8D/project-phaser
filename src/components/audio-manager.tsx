import React from 'react';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import { getMusicVolume, getSfxVolume, setMusicVolume, setSfxVolume } from '../state/audio-state';
import { IconButton } from './icon-button';
import { MusicIcon, VolumeHighIcon, VolumeLowIcon, VolumeMutedIcon } from './icons';
import PopoverMenu from './popover-menu';
import styles from './audio-manager.module.css';

const VOLUME_MIN = 0;
const VOLUME_MAX = 1;
const VOLUME_STEP = 0.01;
const VOLUME_FULL = 1;

const getVolumeIcon = (value: number) => {
  if (value === VOLUME_MIN) return <VolumeMutedIcon />;
  if (value < 0.5) return <VolumeLowIcon />;
  return <VolumeHighIcon />;
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
  const { t } = useLangTranslation('common');

  return (
    <div className={styles.control}>
      <div className={styles.label}>
        <span>{label}</span>
        <span className={styles.sliderRow}>
          <IconButton
            className={styles.volumeButton}
            size='small'
            onClick={toggleMute}
            label={t(value === VOLUME_MIN ? 'unmute' : 'mute')}
          >
            {getVolumeIcon(value)}
          </IconButton>
          <input
            className={styles.slider}
            type='range'
            aria-label={label}
            value={value}
            onChange={(event) => onChange(Number(event.currentTarget.value))}
            min={VOLUME_MIN}
            max={VOLUME_MAX}
            step={VOLUME_STEP}
          />
        </span>
      </div>
    </div>
  );
};

const AudioManager = () => {
  const [open, setOpen] = React.useState(false);
  const [musicVolume, setMusicVolumeState] = React.useState(getMusicVolume());
  const [sfxVolume, setSfxVolumeState] = React.useState(getSfxVolume());
  const { t } = useLangTranslation('common');
  const closeMenu = React.useCallback(() => setOpen(false), []);

  const handleMusicChange = (v: number) => {
    setMusicVolumeState(v);
    setMusicVolume(v);
  };

  const handleSfxChange = (v: number) => {
    setSfxVolumeState(v);
    setSfxVolume(v);
  };

  return (
    <PopoverMenu
      id='audio-menu'
      label={t('audioSettings')}
      variant='audio'
      open={open}
      onClose={closeMenu}
      trigger={
        <IconButton
          onClick={() => setOpen((value) => !value)}
          label={t('audioSettings')}
          aria-controls='audio-menu'
          aria-expanded={open}
        >
          <MusicIcon />
        </IconButton>
      }
    >
          <VolumeControl label={t('musicVolume')} value={musicVolume} onChange={handleMusicChange} />
          <VolumeControl label={t('sfxVolume')} value={sfxVolume} onChange={handleSfxChange} />
    </PopoverMenu>
  );
};

export default AudioManager;
