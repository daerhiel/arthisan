import { InstancePipe } from './instance-pipe';

describe('InstancePipe', () => {
  it('create an instance', () => {
    const pipe = new InstancePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return true for instance of target type', () => {
    class TestClass {}
    const pipe = new InstancePipe();
    const value = new TestClass();
    expect(pipe.transform(value, TestClass)).toBeTrue();
  });

  it('should return false for non-instance of target type', () => {
    class TestClass {}
    const pipe = new InstancePipe();
    const value = {};
    expect(pipe.transform(value, TestClass)).toBeFalse();
  });
});
