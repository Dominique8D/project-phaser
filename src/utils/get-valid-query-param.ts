export function getValidQueryParam(
  key: string,
  validValues: string[],
  defaultValue: string,
): string {
  const urlParams = new URLSearchParams(window.location.search);
  const queryValue = urlParams.get(key);
  return validValues.includes(queryValue ?? '') ? queryValue! : defaultValue;
}
