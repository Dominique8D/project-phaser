import ScoreComponent from './score-component/score-component';
import { MAIN_GAME_ID } from '../../game-consts/game-consts';
import styles from './endless-start-content.module.css';

type EndlessStartContentProps = {
  scene: Phaser.Scene | null;
};

const EndlessStartContent = ({ scene }: EndlessStartContentProps) => {
  const isMainGame = scene?.scene.key === MAIN_GAME_ID;
  return (
    <div className={styles.content}>
      {isMainGame && <ScoreComponent scene={scene} />}
    </div>
  );
};

export default EndlessStartContent;
