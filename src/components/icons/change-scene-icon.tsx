import SvgIcon, { type IconProps } from './icon';

const ChangeSceneIcon = (props: IconProps) => (
  <SvgIcon {...props}>
    <path d='M20 7v5h-5M4 17v-5h5' />
    <path d='M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2' />
  </SvgIcon>
);

export default ChangeSceneIcon;