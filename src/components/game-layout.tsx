import { ReactNode } from 'react';
import GameAppBar from '../components/game-app-bar';
import styles from './game-layout.module.css';

type GameLayoutProps = {
  title: string;
  children: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

const GameLayout: React.FC<GameLayoutProps> = ({ title, children, startContent, endContent }) => {
  return (
    <div className={styles.layout}>
      <GameAppBar title={title} />
      <main className={styles.content}>
        <aside className={styles.sidePanel}>
          <div className={styles.gradientBox}>{startContent}</div>
        </aside>
        <section className={styles.canvas}>{children}</section>
        <aside className={styles.sidePanel}>
          <div className={styles.gradientBox}>{endContent}</div>
        </aside>
      </main>
    </div>
  );
};

export default GameLayout;
