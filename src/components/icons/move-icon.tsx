import SvgIcon, { type IconProps } from './icon';

const MoveIcon = (props: IconProps) => (
  <SvgIcon {...props}>
    <path d='M12 3v18m-4-14 4-4 4 4m-8 10-4-4 4-4m8 8 4-4-4-4' />
    <path d='M3 12h18' />
  </SvgIcon>
);

export default MoveIcon;