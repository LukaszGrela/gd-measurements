import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useResizeObserver } from './useResizeObserver';

describe('hooks', () => {
  describe('useResizeObserver', () => {
    const observerInstances: MockedResizeObserver[] = [];

    class MockedResizeObserver implements ResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        observerInstances.push(this);

        this.observe = vi.fn();
        this.unobserve = vi.fn();
        this.disconnect = vi.fn();
        this.callback = vi.fn(() => callback([], this));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      callback(_entries: ResizeObserverEntry[], _observer: ResizeObserver) {}
      disconnect() {}
      observe() {}
      unobserve() {}
    }

    beforeEach(() => {
      observerInstances.length = 0;
      vi.stubGlobal('ResizeObserver', MockedResizeObserver);
    });
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('callback not called', () => {
      const callback = vi.fn();
      const ref = { current: {} as HTMLElement };
      const { rerender } = renderHook<
        void,
        Parameters<typeof useResizeObserver>
      >((params = [ref, callback]) => {
        return useResizeObserver(params[0], params[1]);
      });

      // observer added
      expect(observerInstances.length).toBe(1);
      //
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(observerInstances[0].callback).not.toHaveBeenCalled();

      rerender([{ current: null as unknown as HTMLElement }, callback]);

      // effect not called on null ref
      // no new observers added
      expect(observerInstances.length).toBe(1);

      // old observer cleaned
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(observerInstances[0].disconnect).toHaveBeenCalled();
    });

    it('callback is called', () => {
      const rect = {
        bottom: 1,
        height: 2,
        left: 3,
        right: 4,
        top: 5,
        width: 6,
        x: 7,
        y: 8,
      };
      const callback = vi.fn();
      const ref = {
        current: {
          getBoundingClientRect: () => rect,
        } as HTMLElement,
      };
      renderHook(() => {
        return useResizeObserver(ref, callback);
      });

      // observer added
      expect(observerInstances.length).toBe(1);
      //
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(observerInstances[0].callback).not.toHaveBeenCalled();

      act(() => {
        // get last instance and trigger callback
        observerInstances.at(0)!.callback([], observerInstances.at(0)!);
      });

      expect(callback).toHaveBeenCalledWith(rect);
    });

    it('changes obbserver on ref change', () => {
      const callback = vi.fn();
      const ref = { current: {} as HTMLElement };
      const { rerender } = renderHook<
        void,
        Parameters<typeof useResizeObserver>
      >((params = [ref, callback]) => {
        return useResizeObserver(params[0], params[1]);
      });

      // observer added
      expect(observerInstances.length).toBe(1);
      //
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(observerInstances[0].disconnect).not.toHaveBeenCalled();
      //
      rerender([{ current: {} as HTMLElement }, vi.fn()]);
      //
      expect(observerInstances.length).toBe(2);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(observerInstances[0].disconnect).toHaveBeenCalled();
    });
  });
});
