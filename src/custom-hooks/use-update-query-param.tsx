import { useEffect } from 'react';

const useUpdateQueryParam = (key: string, value: string) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    window.history.replaceState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
  }, [key, value]);
};

export default useUpdateQueryParam;

