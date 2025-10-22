import { Stack } from '@mui/material';
import EndlessScoreUI from './score-component';

type EndlessStartContentProps = {
  scene: Phaser.Scene | null;
};

const EndlessStartContent = ({ scene }: EndlessStartContentProps) => {
  return (
    <Stack height='100%' width='100%'>
      <EndlessScoreUI scene={scene} />
    </Stack>
  );
};

export default EndlessStartContent;

