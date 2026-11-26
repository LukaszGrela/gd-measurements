import { describe, it, expect } from 'vitest';
import { classNamesToCssSelector } from './classNamesToCssSelector';

describe('utils', () => {
  describe('classNames', () => {
    describe('classNamesToCssSelector', () => {
      it('Returns class name string', () => {
        expect(
          classNamesToCssSelector('a', false, 'b', 'c'),
        ).toEqual('.a.b.c');
        expect(classNamesToCssSelector('a')).toEqual('.a');
        expect(classNamesToCssSelector('a', 'b')).toEqual('.a.b');
      });
      it('Returns undefined', () => {
        expect(classNamesToCssSelector()).toEqual(undefined);
        expect(
          classNamesToCssSelector('', false),
        ).toEqual(undefined);
      });
    });
  });
});
