import { describe, expect, it } from 'vitest';
import { classNames } from './classNames';

describe('utils', () => {
  describe('classNames', () => {
    it('Returns class name string', () => {
      const possibleNull: string | null = null;
      const possibleUndefined: string | undefined = undefined;
      expect(
        classNames(
          'a',
          false,
          'b',
          'c',
          possibleNull,
          possibleUndefined,
        ),
      ).toEqual('a b c');
      expect(classNames('a')).toEqual('a');
      expect(classNames('a', 'b')).toEqual('a b');
      expect(classNames(...['a', 'b'], 'c')).toEqual('a b c');
    });
    it('returns empty', () => {
      expect(classNames()).toBe('');
      expect(classNames('', false, null, undefined, 0)).toBe('');
    });
  });
});
