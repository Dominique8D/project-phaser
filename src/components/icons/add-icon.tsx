import SvgIcon, { type IconProps } from './icon';

const AddIcon = (props: IconProps) => (
  <SvgIcon {...props}>
    <circle cx='12' cy='12' r='9' />
    <path d='M12 8v8m-4-4h8' />
  </SvgIcon>
);

export default AddIcon;