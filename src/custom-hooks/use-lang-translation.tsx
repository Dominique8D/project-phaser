import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/language-context';

const useLangTranslation = (langKey: string) => {
  const { language } = useLanguage();
  const { t } = useTranslation(langKey, { lng: language });

  return { t };
};

export default useLangTranslation;

