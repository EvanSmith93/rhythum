/* eslint-disable @typescript-eslint/no-explicit-any */

export function debounce(
  func: (...args: any[]) => void,
  timeout: number = 300
) {
  let timer: number;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
