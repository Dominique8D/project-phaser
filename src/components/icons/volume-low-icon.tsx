import SvgIcon, { type IconProps } from './icon';

const VolumeLowIcon = (props: IconProps) => (
  <SvgIcon {...props}>
    <path d='M11 5 6 9H3v6h3l5 4z' />
    <path d='M15 9a5 5 0 0 1 0 6' />
  </SvgIcon>
);

export default VolumeLowIcon;