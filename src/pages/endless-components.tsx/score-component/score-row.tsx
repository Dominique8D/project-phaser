import { Box, Typography, useTheme } from '@mui/material';
import {
  SCORE_ROW_STYLES,
  getScoreBlockStyles,
  getDigitBoxStyles,
  getDigitTextStyles,
} from './score-row-styling';
import { TOTAL_DIGITS } from '../../../endless_game/utils/game-consts';

type ScoreRowProps = {
  label: string;
  value: number;
  shouldAnimate: boolean;
};

const ScoreRow = ({ label, value, shouldAnimate }: ScoreRowProps) => {
  const theme = useTheme();

  const scoreStr = value.toString();
  const paddedScore = scoreStr.padStart(TOTAL_DIGITS, '0');
  const leadingCount = paddedScore.length - scoreStr.length;

  const digits = paddedScore.split('').map((digit, index) => {
    const isLeading = index < leadingCount;
    return (
      <Box key={index} sx={getDigitBoxStyles()}>
        <Typography variant='inherit' sx={getDigitTextStyles(theme, isLeading, shouldAnimate)}>
          {digit}
        </Typography>
      </Box>
    );
  });

  return (
    <Box sx={SCORE_ROW_STYLES.container}>
      <Typography variant='h6' sx={SCORE_ROW_STYLES.labelText}>
        {label}
      </Typography>
      <Box sx={getScoreBlockStyles(theme)}>{digits}</Box>
    </Box>
  );
};

export default ScoreRow;

