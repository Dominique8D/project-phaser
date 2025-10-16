import TestGamePage from '../pages/test';
import EndlessGamePage from '../pages/endless';

export type GameRoute = {
  label: string;
  value: string;
  path: string;
  component: React.FC;
};

export const GAME_ROUTES: GameRoute[] = [
  {
    label: 'Test Game',
    value: 'test_game',
    path: '/test',
    component: TestGamePage,
  },
  {
    label: 'Endless Game',
    value: 'endless_game',
    path: '/endless',
    component: EndlessGamePage,
  },
];

