import { stateAttribute, StatePipe } from './state-pipe';

describe('stateAttribute', () => {
  const tests = [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: 1, expected: 1 },
    { input: 0, expected: 0 },
    { input: -1, expected: -1 },
    { input: '1', expected: 1 },
    { input: '0', expected: 0 },
    { input: '-1', expected: -1 },
    { input: 'true', expected: true },
    { input: 'false', expected: false },
    { input: null, expected: false },
    { input: undefined, expected: false },
  ];

  tests.forEach(({ input, expected }) => {
    it(`should transform ${input} to ${expected}`, () => {
      expect(stateAttribute(input)).toEqual(expected);
    });
  });
});

describe('StatePipe', () => {
  it('create an instance', () => {
    const pipe = new StatePipe();
    expect(pipe).toBeTruthy();
  });

  const tests = [
    { input: 100, expected: true },
    { input: 0, expected: false },
    { input: -100, expected: false },
    { input: null, expected: null },
    { input: undefined, expected: null },
  ];

  tests.forEach(({ input, expected }) => {
    it(`should transform ${input} to ${expected}`, () => {
      const pipe = new StatePipe();
      expect(pipe.transform(input)).toEqual(expected);
    });
  });
});
