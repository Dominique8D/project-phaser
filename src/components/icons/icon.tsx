import type { ReactNode, SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

type SvgIconProps = IconProps & {
  children: ReactNode;
};

const SvgIcon = ({ children, ...props }: SvgIconProps) => (
  <svg
    aria-hidden='true'
    focusable='false'
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    {children}
  </svg>
);

export default SvgIcon;