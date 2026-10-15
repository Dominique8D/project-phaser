import useLangTranslation from '../../custom-hooks/use-lang-translation';
import { IconButton } from '../icon-button';
import { AddIcon, ChangeSceneIcon, MoveIcon } from '../icons';
import styles from './test-game-controls.module.css';

type TestGameControlsProps = {
  canMoveSprite: boolean;
  changeScene: () => void;
  moveSprite: () => void;
  addSprite: () => void;
};

const TestGameControls: React.FC<TestGameControlsProps> = ({
  canMoveSprite,
  changeScene,
  moveSprite,
  addSprite,
}) => {
  const { t } = useLangTranslation('common');

  return (
    <div className={styles.controls}>
      <IconButton onClick={changeScene} label={t('changeScene')}>
        <ChangeSceneIcon />
      </IconButton>
      <IconButton disabled={canMoveSprite} onClick={moveSprite} label={t('moveSprite')}>
        <MoveIcon />
      </IconButton>
      <IconButton onClick={addSprite} label={t('addSprite')}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default TestGameControls;
