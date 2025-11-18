import { type RefObject, useCallback, useEffect, useRef } from "react";
import { rectsEqual } from "../utils/domrect/rectsEqual";

/**
 * Hook to observe size changes.
 * 
      ```TS
      import { useRef } from 'react';
      import { useResizeObserver } from '@/hooks';

      const ref = useRef<HTMLDivElement | null>(null);
      useResizeObserver(ref, (rect) => {
        console.log(rect.width, rect.height)
      });


      <div ref={ref}>...</div>
      ```
 * @param elementRef 
 * @param callback 
 */
export const useResizeObserver = <T extends Element = Element>(
  elementRef: RefObject<T | null> | undefined,
  callback: (rect: DOMRect) => void
): void => {
  const rect = useRef<DOMRect | null>(null);

  const observerCallback = useCallback(() => {
    if (elementRef?.current) {
      const incoming = elementRef.current.getBoundingClientRect();
      if (!rectsEqual(rect.current, incoming)) {
        rect.current = DOMRect.fromRect(incoming);
        callback(incoming);
      }
    }
  }, [callback, elementRef]);

  useEffect(() => {
    if (!elementRef?.current) {
      return;
    }

    const observer = new ResizeObserver(observerCallback);

    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
    };
  }, [elementRef, observerCallback]);
};
