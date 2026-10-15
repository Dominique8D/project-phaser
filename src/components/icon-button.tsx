import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './icon-button.module.css';

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  label: string;
  size?: 'regular' | 'small';
  children: ReactNode;
};

export const IconButton = ({ label, size = 'regular', className, children, ...props }: IconButtonProps) => (
  <button
    {...props}
    className={`${styles.button} ${className ?? ''}`}
    data-size={size}
    aria-label={label}
  >
    {children}
  </button>
);

type IconLinkProps = {
  to: string;
  label: string;
  children: ReactNode;
};

export const IconLink = ({ to, label, children }: IconLinkProps) => (
  <Link className={styles.button} to={to} aria-label={label}>
    {children}
  </Link>
);