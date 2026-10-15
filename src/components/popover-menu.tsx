import { useEffect, useRef, type ReactNode } from 'react';
import styles from './popover-menu.module.css';

type PopoverMenuProps = {
  id: string;
  label: string;
  open: boolean;
  onClose: () => void;
  variant: 'audio' | 'language';
  trigger: ReactNode;
  children: ReactNode;
};

const PopoverMenu = ({ id, label, open, onClose, variant, trigger, children }: PopoverMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onClose();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <div className={styles.container} ref={containerRef}>
      {trigger}
      {open && (
        <div className={styles.menu} data-variant={variant} id={id} role='group' aria-label={label}>
          {children}
        </div>
      )}
    </div>
  );
};

export default PopoverMenu;