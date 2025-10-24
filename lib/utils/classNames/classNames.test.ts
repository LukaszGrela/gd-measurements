import { classNames } from './classNames';

describe('utils', () => {
  describe('classNames', () => {
    it('Returns class name string', () => {
      const possibleNull: string | null = null;
      const possibleUndefined: string | undefined = undefined;
      expect(
        classNames(
          'a',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          false && 'x',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          true && 'b',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          1 && 'c',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          possibleNull && 'y',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          possibleUndefined && 'z',
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
