import { Theme } from '@mui/material/styles';

export const SCORE_SCALE = 1.35;

const DIGIT_GAP = 0.4;
const BLOCK_PADDING_X = 2;
const BLOCK_PADDING_Y = 1.2;
const MIN_HEIGHT = { xs: 80, md: 100 };
const MIN_DIGIT_WIDTH = 24;
const MAX_DIGIT_WIDTH = 48;

const FLEX_CENTER = {
  display: 'flex',
  alignItems: 'center',
};

export const SCORE_ROW_STYLES = {
  container: {
    backgroundColor: 'background.paper',
    borderRadius: 2,
    padding: 3,
    boxShadow: 1,
    width: '100%',
    minHeight: MIN_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'center',
    ...FLEX_CENTER,
    gap: 1.2,
  },
  labelText: {
    fontWeight: 'bold',
    color: 'text.secondary',
    fontSize: { xs: '1.2rem', md: '1.4rem' },
    textAlign: 'center',
  },
};

export const getScoreBlockStyles = (theme: Theme) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: 2,
  paddingX: BLOCK_PADDING_X,
  paddingY: BLOCK_PADDING_Y,
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: `minmax(${MIN_DIGIT_WIDTH}px, ${MAX_DIGIT_WIDTH}px)`,
  gap: DIGIT_GAP,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  minWidth: 0,
  flex: 1,
});

export const getDigitBoxStyles = () => ({
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

export const getDigitTextStyles = (theme: Theme, isLeading: boolean, shouldAnimate: boolean) => ({
  fontWeight: 'bold',
  fontSize: 'clamp(1rem, 4vw, 2.2rem)',
  color: isLeading ? theme.palette.text.secondary : theme.palette.primary.contrastText,
  transition: 'transform 0.3s ease',
  transform: shouldAnimate ? `scale(${SCORE_SCALE})` : 'scale(1)',
  transformOrigin: 'center',
  lineHeight: 1,
});

