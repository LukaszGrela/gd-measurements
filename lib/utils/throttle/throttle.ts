export type TThrottled<TArgs extends unknown[]> = {
  (...args: TArgs): void;
  /** Cancels the pending trailing call. */
  cancel: () => void;
  /** Invokes the pending trailing call immediately. */
  flush: () => void;
};

/**
 * Dependency free replacement of `lodash.throttle` with the same default
 * behaviour: the first call is invoked immediately (leading edge) and the last
 * one within the `wait` window is invoked at its end (trailing edge).
 *
 * ```
 * const update = throttle((value: number) => setValue(value), 250);
 * update(1); // invoked now
 * update(2); // invoked after 250ms
 * update.cancel(); // drops the pending call, e.g. on unmount
 * ```
 * @param fn function to throttle
 * @param wait minimum time in milliseconds between invocations
 * @returns throttled function with `cancel` and `flush` helpers
 */
export const throttle = <TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  wait = 0
): TThrottled<TArgs> => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime = 0;
  let lastArgs: TArgs | null = null;

  const invoke = () => {
    if (!lastArgs) {
      return;
    }

    const args = lastArgs;
    lastArgs = null;
    lastCallTime = Date.now();
    fn(...args);
  };

  const throttled = ((...args: TArgs) => {
    lastArgs = args;

    const remaining = wait - (Date.now() - lastCallTime);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // leading edge
      invoke();

      return;
    }

    if (!timeoutId) {
      // schedule trailing edge
      timeoutId = setTimeout(() => {
        timeoutId = null;
        invoke();
      }, remaining);
    }
  }) as TThrottled<TArgs>;

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    lastArgs = null;
    lastCallTime = 0;
  };

  throttled.flush = () => {
    if (!timeoutId) {
      return;
    }

    clearTimeout(timeoutId);
    timeoutId = null;
    invoke();
  };

  return throttled;
};
