import SvgIcon, { type IconProps } from './icon';

const VolumeMutedIcon = (props: IconProps) => (
  <SvgIcon {...props}>
    <path d='M11 5 6 9H3v6h3l5 4z' />
    <path d='m16 9 5 6m0-6-5 6' />
  </SvgIcon>
);

export default VolumeMutedIcon;