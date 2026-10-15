import React from 'react';
import { useLanguage } from '../context/language-context';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import { IconButton } from './icon-button';
import PopoverMenu from './popover-menu';
import styles from './lang-selector.module.css';

// Thanks SimplyLocalize
// https://simplelocalize.io/blog/posts/hosted-flag-icons/
const LANGUAGES = ['nl', 'gb'];
const LangSelector = () => {
  const [open, setOpen] = React.useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useLangTranslation('common');
  const flagUrl = `https://cdn.simplelocalize.io/public/v1/flags/${language}.svg`;
  const closeMenu = React.useCallback(() => setOpen(false), []);

  const handleLangChange = (selectedLang: string) => {
    setLanguage(selectedLang);
    setOpen(false);
  };

  return (
    <PopoverMenu
      id='language-menu'
      label={t('languageSelection')}
      variant='language'
      open={open}
      onClose={closeMenu}
      trigger={
        <IconButton
          onClick={() => setOpen((value) => !value)}
          label={t('languageSelection')}
          aria-controls='language-menu'
          aria-expanded={open}
        >
          <img className={styles.currentFlag} src={flagUrl} alt='' />
        </IconButton>
      }
    >
          {LANGUAGES.map((option) => (
            <button
              className={styles.option}
              key={option}
              type='button'
              onClick={() => handleLangChange(option)}
              aria-current={language === option ? 'true' : undefined}
            >
              <img src={`https://cdn.simplelocalize.io/public/v1/flags/${option}.svg`} alt='' />
              <span>{t(option === 'nl' ? 'languageNl' : 'languageGb')}</span>
            </button>
          ))}
    </PopoverMenu>
  );
};

export default LangSelector;
