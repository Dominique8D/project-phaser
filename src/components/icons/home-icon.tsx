import SvgIcon, { type IconProps } from './icon';

const HomeIcon = (props: IconProps) => (
  <SvgIcon {...props}>
    <path d='m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' />
  </SvgIcon>
);

export default HomeIcon;