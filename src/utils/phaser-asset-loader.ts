const basePath = import.meta.env.BASE_URL || '/';

export const getAssetPath = (file: string): string => {
  return `${basePath}assets/${file}`;
};
