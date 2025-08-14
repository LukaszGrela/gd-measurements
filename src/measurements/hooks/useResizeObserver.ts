import { rectsEqual } from '@/utils/domrect/rectsEqual';
import { RefObject, useCallback, useEffect, useRef } from 'react';

export const useResizeObserver = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  callback: (rect: DOMRect) => void,
): void => {
  const rect = useRef<DOMRect | null>(null);

  const observerCallback = useCallback(() => {
    if (elementRef.current) {
      const incoming = elementRef.current.getBoundingClientRect();
      if (!rectsEqual(rect.current, incoming)) {
        rect.current = DOMRect.fromRect(incoming);
        callback(incoming);
      }
    }
  }, [callback, elementRef]);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const observer = new ResizeObserver(observerCallback);

    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
    };
  }, [elementRef, observerCallback]);
};
