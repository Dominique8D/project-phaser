import { GAME_ROUTES } from '../config/game-config';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import styles from './game-selector.module.css';

const GameSelector: React.FC = () => {
  const { t } = useLangTranslation('common');
  const { t: tGameRoutes } = useLangTranslation('gameRoutes');

  return (
    <main className={styles.selector}>
      <h1 className={styles.heading}>{t('gameSelect')}</h1>
      <nav className={styles.gameLinks} aria-label={t('gameSelect')}>
        {GAME_ROUTES.map(({ tKey, path, value }) => (
          <a key={value} className={styles.gameLink} href={`#${path}`}>
            {tGameRoutes(tKey)}
          </a>
        ))}
      </nav>
    </main>
  );
};

export default GameSelector;
