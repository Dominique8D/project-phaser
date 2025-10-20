import { IconButton, Stack } from '@mui/material';

import OpenWithIcon from '@mui/icons-material/OpenWith';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
  return (
    <Stack direction='row'>
      <IconButton onClick={changeScene}>
        <ChangeCircleIcon />
      </IconButton>
      <IconButton disabled={canMoveSprite} onClick={moveSprite}>
        <OpenWithIcon />
      </IconButton>
      <IconButton onClick={addSprite}>
        <AddCircleIcon />
      </IconButton>
    </Stack>
  );
};

export default TestGameControls;

