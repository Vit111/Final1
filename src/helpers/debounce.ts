// export const debounce = (callback: (...args: any[]) => void, delay: number) => {
//     let timer: any = null;
//     return (...args: any[]) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => callback(...args), delay);
//     }
// }

import { useRef, useEffect } from "react";

export default function useDebouncedFunction(func: (...args: any) => void, delay: number | undefined, cleanUp = false) {
  const timer: any = useRef();

  function clearTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (...args: any) => {
    clearTimer();
    timer.current = setTimeout(() => func(...args), delay);
  };
}