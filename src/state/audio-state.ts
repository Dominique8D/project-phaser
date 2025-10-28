export const DEFAULT_MUSIC_VOLUME = 0.7;
export const DEFAULT_SFX_VOLUME = 0.5;

let musicVolume = DEFAULT_MUSIC_VOLUME;
let sfxVolume = DEFAULT_SFX_VOLUME;

const clampVolume = (value: number) => Math.max(0, Math.min(1, value));
export const getMusicVolume = () => musicVolume;
export const getSfxVolume = () => sfxVolume;

export const setMusicVolume = (value: number) => {
  musicVolume = clampVolume(value);
};

export const setSfxVolume = (value: number) => {
  sfxVolume = clampVolume(value);
};

