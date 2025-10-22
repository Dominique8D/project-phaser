import { Stack } from '@mui/material';
import ScoreComponent from './score-component/score-component';

type EndlessStartContentProps = {
  scene: Phaser.Scene | null;
};

const EndlessStartContent = ({ scene }: EndlessStartContentProps) => {
  return (
    <Stack height='100%' width='100%' justifyContent='start' alignItems='center'>
      <ScoreComponent scene={scene} />
    </Stack>
  );
};

export default EndlessStartContent;

