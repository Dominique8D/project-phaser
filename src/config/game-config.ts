import TestGamePage from '../pages/test';
import EndlessGamePage from '../pages/endless';

export type GameRoute = {
  tKey: string;
  value: string;
  path: string;
  component: React.FC;
};

export const GAME_ROUTES: GameRoute[] = [
  {
    tKey: 'testGame',
    value: 'test_game',
    path: '/test',
    component: TestGamePage,
  },
  {
    tKey: 'endlessGame',
    value: 'endless_game',
    path: '/endless',
    component: EndlessGamePage,
  },
];

