import { Stack } from '@mui/material';
import ScoreComponent from './score-component/score-component';
import { MAIN_GAME_ID } from '../../game-consts/game-consts';

type EndlessStartContentProps = {
  scene: Phaser.Scene | null;
};

const EndlessStartContent = ({ scene }: EndlessStartContentProps) => {
  const isMainGame = scene?.scene.key === MAIN_GAME_ID;
  return (
    <Stack height='100%' width='100%' justifyContent='start' alignItems='start'>
      {isMainGame && <ScoreComponent scene={scene} />}
    </Stack>
  );
};

export default EndlessStartContent;

