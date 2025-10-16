import useLangTranslation from './custom-hooks/use-lang-translation';
import './i18n';
import GameSelector from './components/game-selector';
import GameAppBar from './components/game-app-bar';

function App() {
  const { t } = useLangTranslation('common');

  return (
    <>
      <GameAppBar title={t('title')} isLangSelectorDisabled={false} />
      <GameSelector />
    </>
  );
}

export default App;
