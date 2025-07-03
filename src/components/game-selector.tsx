import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';

export const TEST_GAME = 'test_game';
export const ENDLESS_GAME = 'endless_game';

const GAME_OPTIONS = [TEST_GAME, ENDLESS_GAME];

type GameSelectorProps = {
  currentGame: string | null;
  setCurrentGame: (value: string | null) => void;
};

const GameSelector: React.FC<GameSelectorProps> = ({ currentGame, setCurrentGame }) => {
  const radioName = 'game-select';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGame(event.target.value);
  };

  return (
    <Stack
      width={1024}
      height={768}
      sx={{
        background: 'linear-gradient(135deg,rgba(0, 102, 255, 0.24), #ffffff)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormControl required>
        <FormLabel id='game-select-label'>Game Select</FormLabel>
        <RadioGroup
          aria-labelledby='game-select-label'
          name={radioName}
          value={currentGame ?? ''}
          onChange={handleChange}
        >
          {GAME_OPTIONS.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default GameSelector;

