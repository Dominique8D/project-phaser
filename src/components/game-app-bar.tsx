import { useTranslation } from 'react-i18next';
import ThemeToggleButton from '../theme/theme-toggle-button';
import LangSelector from './lang-selector';
import AudioManager from './audio-manager';
import { HomeIcon } from './icons';
import { IconLink } from './icon-button';
import styles from './game-app-bar.module.css';

type GameAppBarProps = {
  title: string;
};

const GameAppBar: React.FC<GameAppBarProps> = ({ title }) => {
  const { t } = useTranslation('common');

  return (
    <header className={styles.header}>
      <nav className={styles.navigation} aria-label={t('appNavigation')}>
        <IconLink to='/' label={t('home')}>
          <HomeIcon />
        </IconLink>
        <div className={styles.title}>{title}</div>
        <div className={styles.actions}>
          <AudioManager />
          <ThemeToggleButton />
          <LangSelector />
        </div>
      </nav>
    </header>
  );
};

export default GameAppBar;
