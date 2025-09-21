import { StatePipe } from './state-pipe';

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
