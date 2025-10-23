import { Theme } from '@mui/material/styles';
import { ENDLESS_FONT_FAMILIES } from '../../../theme/theme-consts';

export const SCORE_SCALE = 1.35;
const MIN_DIGIT_WIDTH = 32;
const MAX_DIGIT_WIDTH = 36;

export const SCORE_ROW_STYLES = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 'fit-content',
  },
  labelText: {
    fontWeight: 'bold',
    fontFamily: ENDLESS_FONT_FAMILIES.main,
    color: 'text.primary',
    fontSize: { xs: '1rem', md: '1.2rem' },
    textAlign: 'left',
  },
};

export const getScoreBlockStyles = (theme: Theme) => ({
  padding: 0.5,
  borderRadius: 1,
  gridAutoFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  display: 'grid',
  gridAutoColumns: `minmax(${MIN_DIGIT_WIDTH}px, ${MAX_DIGIT_WIDTH}px)`,
  backgroundColor: theme.palette.primary.light,
});

export const getDigitBoxStyles = () => ({
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
});

export const getDigitTextStyles = (theme: Theme, isLeading: boolean, shouldAnimate: boolean) => ({
  lineHeight: 1,
  fontWeight: 'bold',
  fontFamily: ENDLESS_FONT_FAMILIES.main,
  transformOrigin: 'center',
  fontSize: 'clamp(1rem, 4vw, 2rem)',
  transition: 'transform 0.3s ease',
  transform: shouldAnimate ? `scale(${SCORE_SCALE})` : 'scale(1)',
  color: isLeading ? theme.palette.text.secondary : theme.palette.primary.contrastText,
});

